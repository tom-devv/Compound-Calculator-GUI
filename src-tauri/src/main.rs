#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use std::ffi::c_float;
use std::thread;
use crate::entity::{EntityProps, Path, Settings};

mod entity;

fn main() {
  tauri::Builder::default()
      .invoke_handler(tauri::generate_handler![calculate])
      .run(tauri::generate_context!())
      .expect("error while running tauri application");
}

pub const GRAVITY: f64 = 0.0399999991059303;
pub const DRAG: f64 = 0.9800000190734863;


// https://rosettacode.org/wiki/Permutations_with_repetitions#Rust

struct PermutationIterator<'a, T: 'a> {
  universe: &'a [T],
  size: usize,
  prev: Option<Vec<usize>>,
}

fn permutations<T>(universe: &[T], size: usize) -> PermutationIterator<T> {
  PermutationIterator {
    universe,
    size,
    prev: None,
  }
}

fn map<T>(values: &[T], ixs: &[usize]) -> Vec<T>
  where
      T: Clone,
{
  ixs.iter().map(|&i| values[i].clone()).collect()
}

impl<'a, T> Iterator for PermutationIterator<'a, T>
  where
      T: Clone,
{
  type Item = Vec<T>;

  fn next(&mut self) -> Option<Vec<T>> {
    let n = self.universe.len();

    if n == 0 {
      return None;
    }

    match self.prev {
      None => {
        let zeroes: Vec<usize> = std::iter::repeat(0).take(self.size).collect();
        let result = Some(map(self.universe, &zeroes[..]));
        self.prev = Some(zeroes);
        result
      }
      Some(ref mut indexes) => match indexes.iter().position(|&i| i + 1 < n) {
        None => None,
        Some(position) => {
          for index in indexes.iter_mut().take(position) {
            *index = 0;
          }
          indexes[position] += 1;
          Some(map(self.universe, &indexes[..]))
        }
      },
    }
  }
}

#[tauri::command]
// fn calculate(mut projectile: Vec<EntityProps>, mut powers: Vec<EntityProps>, sets:Vec<Settings>) -> Vec<Vec<Path>> {
fn calculate(mut projectile: Vec<EntityProps>, mut powers: Vec<EntityProps>, sets:Vec<Settings>)  {

  let results = thread::spawn(move || {
    let mut pro: EntityProps = projectile[0];
    let settings: Settings = sets[0].clone();

    let mut positions:Vec<Vec<Path>> = Vec::new();

    println!("hello");

    let inity = pro.y;



    let data: Vec<i32> = (0..settings.max_power).collect();


    for p in permutations(&data[..], powers.len()){

      for (i,n) in p.iter().enumerate() { // Set the powers
        // powers[i].amount = *n;
        powers[i].amount = 16;
      }

      let velocity = compound(&powers, pro);

      println!("{:#?}", &velocity);

      let locations:Vec<Path> = posts(pro, &p, &velocity);


      // println!("{:#?}", locations);
      positions.push(locations);

      // for location in locations {
      //   println!("{:?}", location);
      // }


      pro.vy = 0.0;
      pro.y = inity;

    }
    limits(positions, settings);
    println!("Calculation Complete")
  });
}

fn compound(powers: &Vec<EntityProps>, mut projectile: EntityProps) -> f64{


  for(_index ,power ) in powers.iter().enumerate() {


    let x = projectile.x - power.x;
    let y = projectile.y - power.y;
    let z = projectile.z - power.z;

    let hyp: c_float = ((x * x + y * y + z * z) as c_float).sqrt();
    let exposure:f64 = ((-1.0 / 8.0) + (1.0 / hyp as f64));


    if exposure == 0.0 || exposure >= 64.0 {
      println!("{:?} does not effect tnt", power);
    }
    else {
      projectile.vy = (y * exposure * power.amount as f64) + projectile.vy;

    }
  }

  projectile.vy

}

fn posts(mut projectile: EntityProps, combo: &Vec<i32>, velocity: &f64) -> Vec<Path> {

  let mut locations:Vec<Path> = Vec::new();

  projectile.vy = *velocity;

  for i in 0..projectile.ticks {

    // if projectile.y < 1.0 {
    //   println!("Projectile has gone below Y=1");
    //   break;
    // }

    projectile.vy = projectile.vy - GRAVITY;
    projectile.y = projectile.y + projectile.vy;
    projectile.vy = projectile.vy * DRAG;

    // println!("Y: {} MotY: {} Tick: {} -> Combo: {:?}", projectile.y, projectile.vy, i, combo);
    locations.push(Path {
      x: projectile.x,
      y: projectile.y,
      z: projectile.z,
      vx: projectile.vx,
      vy: projectile.vy,
      vz: projectile.vz,
      tick: i,
      combo: combo.clone()
    })
  }
  locations
}

fn limits (paths: Vec<Vec<Path>>, settings:Settings) {
  println!("Finding Limits");
  for path in paths {
    for position in path {
      // println!("VY={} Tick={} Combo={:?}", position.vy, position.tick, position.combo)
      let mut vy = (position.vy.to_string());//.split('.');
      let mut vy = vy.split('.');

      let vec = vy.collect::<Vec<&str>>();
      if vec[1].starts_with(&settings.vy) {
        println!("Y={:?} Combo={:?} Tick={}", &vec[1], &position.combo, position.tick);

      }
    }
  }
}
