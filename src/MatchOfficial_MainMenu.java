import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class MatchOfficial_MainMenu extends JFrame{
    private JButton btnCreateNewMatch;
    private JPanel panelMain;
    private JButton leaderboardbutton;
    private JButton logoutButton;

    public JPanel getPanelMain() {
        return panelMain;
    }

    public MatchOfficial_MainMenu() {
        btnCreateNewMatch.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                MainMenuNewMatch mainMenuNewMatch = new MainMenuNewMatch();

                mainMenuNewMatch.setContentPane(mainMenuNewMatch.getPanelMain());
                Dimension parentSize = getSize();
                mainMenuNewMatch.setSize(parentSize);
                mainMenuNewMatch.setLocationRelativeTo(null);
                mainMenuNewMatch.setVisible(true);
                mainMenuNewMatch.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
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
                LeaderBoard leaderBoard_obj = new LeaderBoard();
                leaderBoard_obj.setContentPane(leaderBoard_obj.getPanelMain());
                leaderBoard_obj.setSize(400, 400);
                leaderBoard_obj.setLocationRelativeTo(null);
                leaderBoard_obj.setVisible(true);
                leaderBoard_obj.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

                dispose();
            }
        });
    }
}
