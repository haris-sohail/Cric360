import javax.swing.*;
import java.awt.*;

public class UserOperations {
    private String userType;

    public UserOperations(String userType){
        this.userType = userType;
    }

    public void userMainScreen(){
        if(userType.equals("Player")){

        }
        else if(userType.equals("Enthusiast")){

        }
        else if(userType.equals("MatchOfficial")){
            System.out.println("Match Official Main menu");
            MatchOfficial_MainMenu matchOfficialMainMenu = new MatchOfficial_MainMenu();
            matchOfficialMainMenu.setContentPane(matchOfficialMainMenu.getPanelMain());
            matchOfficialMainMenu.setSize(400, 400);
            matchOfficialMainMenu.setLocationRelativeTo(null);
            matchOfficialMainMenu.setVisible(true);
            matchOfficialMainMenu.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        }
    }
}
