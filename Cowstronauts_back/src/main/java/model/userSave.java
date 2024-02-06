package main.java.model;

import java.util.List;

public class userSave {

	private List<saveUpgrades> upgrades;
	private int cantPoints;
	private int cps;
	private int pointsPerClick;
	
	public List<saveUpgrades> getUpgrades() {
		return upgrades;
	}
	public void setUpgrades(List<saveUpgrades> upgrades) {
		this.upgrades = upgrades;
	}
	
	public int getCantPoints() {
		return cantPoints;
	}
	public void setCantPoints(int cantPoints) {
		this.cantPoints = cantPoints;
	}
	
	public int getCps() {
		return cps;
	}
	public void setCps(int cps) {
		this.cps = cps;
	}
	
	public int getPointsPerClick() {
		return pointsPerClick;
	}
	public void setPointsPerClick(int pointsPerClick) {
		this.pointsPerClick = pointsPerClick;
	}
	
}
