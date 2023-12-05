import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class MatchOfficial_MainMenuController extends JFrame{
    private JButton btnCreateNewMatch;
    private JPanel panelMain;
    private JButton leaderboardbutton;
    private JButton logoutButton;

    public JPanel getPanelMain() {
        return panelMain;
    }

    public MatchOfficial_MainMenuController() {
        btnCreateNewMatch.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                MainMenuNewMatchController mainMenuNewMatchController = new MainMenuNewMatchController();

                mainMenuNewMatchController.setContentPane(mainMenuNewMatchController.getPanelMain());
                Dimension parentSize = getSize();
                mainMenuNewMatchController.setSize(parentSize);
                mainMenuNewMatchController.setLocationRelativeTo(null);
                mainMenuNewMatchController.setVisible(true);
                mainMenuNewMatchController.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                dispose();
            }
        });
        logoutButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                Main.handleSignup();
                dispose();
            }
        });
        leaderboardbutton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                System.out.println("Show Leaderboard");
                LeaderBoardController leaderBoard_Controller_obj = new LeaderBoardController();
                leaderBoard_Controller_obj.setContentPane(leaderBoard_Controller_obj.getPanelMain());
                leaderBoard_Controller_obj.setSize(400, 400);
                leaderBoard_Controller_obj.setLocationRelativeTo(null);
                leaderBoard_Controller_obj.setVisible(true);
                leaderBoard_Controller_obj.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

                dispose();
            }
        });
    }
}
