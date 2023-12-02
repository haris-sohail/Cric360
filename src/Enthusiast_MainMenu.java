import javax.swing.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class Enthusiast_MainMenu extends JFrame{
    private JButton btnSeeRequests;
    private JPanel panelMain;
    private JButton viewStatsButton;
    private JButton leaderboardbutton;
    private JButton logoutButton;

    public Enthusiast_MainMenu() {
        btnSeeRequests.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                System.out.println("Set Match Notifications");
                SetMatchNotifications setmatchnotifications = new SetMatchNotifications();
                setmatchnotifications.setContentPane(setmatchnotifications.getPanelMain());
                setmatchnotifications.setSize(400, 400);
                setmatchnotifications.setLocationRelativeTo(null);
                setmatchnotifications.setVisible(true);
                setmatchnotifications.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                dispose();
            }
        });
        viewStatsButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                System.out.println("Set Match Notifications");
                ViewStats viewstats = new ViewStats();
                viewstats.setContentPane(viewstats.getPanelMain());
                viewstats.setSize(400, 400);
                viewstats.setLocationRelativeTo(null);
                viewstats.setVisible(true);
                viewstats.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
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
        logoutButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                Main.handleSignup();
                dispose();
            }
        });
    }

    public JPanel getPanelMain() {return panelMain;}



}
