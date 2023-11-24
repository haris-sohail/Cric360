import java.util.Date;

public class MatchOfficial extends User{
    private int noOfMatches;
    private double decisionAccuracyPerc;

    public MatchOfficial(String first_name, String last_name, String username, String password, String gender, String DOB){
        this.first_name = first_name;
        this.last_name = last_name;
        this.username = username;
        this.password = password;
        this.DOB = DOB;
        this.gender = gender;

        this.type = "MatchOfficial";
    }

    // setters and getters
     public int getNoOfMatches() {
        return noOfMatches;
    }

    public void setNoOfMatches(int noOfMatches) {
        this.noOfMatches = noOfMatches;
    }

    public double getDecisionAccuracyPerc() {
        return decisionAccuracyPerc;
    }

    public void setDecisionAccuracyPerc(double decisionAccuracyPerc) {
        this.decisionAccuracyPerc = decisionAccuracyPerc;
    }


}
