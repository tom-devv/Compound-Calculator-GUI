#[derive(serde::Serialize, serde::Deserialize, Clone, Debug, Copy)]

pub struct EntityProps {
    pub x: f64,
    pub y: f64,
    pub z: f64,
    pub vx: f64,
    pub vy: f64,
    pub vz: f64,
    pub amount: i32,
    pub ticks: i32,
}
#[derive(serde::Serialize, serde::Deserialize, Clone, Debug)]

pub struct Settings {
    pub max_power: i32,
    pub x: String,
    pub y: String,
    pub z: String,
    pub vx: String,
    pub vy: String,
    pub vz: String,
}
#[derive(serde::Serialize, serde::Deserialize, Clone, Debug)]
pub struct Path {
    pub x: f64,
    pub y: f64,
    pub z: f64,
    pub vx: f64,
    pub vy: f64,
    pub vz: f64,
    pub tick: i32,
    pub combo: Vec<i32>
}