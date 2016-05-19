#外部ライブラリ
C++での開発に使用できる有用なライブラリを以下に例示する。

- [Boost C++ Libraries](http://www.boost.org/)

C++の準標準と呼ばれているライブラリ。C++標準化委員会のメンバも多く関わっており、Boostに含まれるライブラリの中から次期標準ライブラリとして採用されたものも多数ある。Intel(Boost.Polygon), Adobe(Boost.GIL)も開発に関わっている。スレッド、ネットワーク、ファイルシステム、構文解析器、正規表現、グラフ、線形代数、分散処理、区間計算、計算幾何、多倍長整数など、現在ではだいたい揃ってる。  
ライセンス：Boost Software License 1.0


- [OpenCV](http://opencv.jp/)

クロスプラットフォームな画像処理、画像認識のためのC++の高水準なクラスライブラリが提供されている。Boostとも連携しやすい。最近ではCUDAなどにも対応している。  
ライセンス：BSD License


- [Qt](https://www.qt.io/)

クロスプラットフォームなGUIライブラリ。最近ではStackOverflowでも「C++でGUIライブラリと言えば？」と質問が上がると9割は「Qt」という答えが返ってくる。  
ライセンス：LGPL


- [GLM(OpenGL Mathematics)](http://glm.g-truc.net/)

3Dグラフィクスのためのヘッダオンリーライブラリ。OpenGLの生のAPIを使うよりこちらの方が扱いやすい。  
ライセンス：MIT License


- [MongoDB](http://www.mongodb.org/)

データベースライブラリ。  
ライセンス：Creative Commons, CC BY-NC-SA 3.0


- [MessagePack implementation for C and C++](https://github.com/msgpack/msgpack-c)

通信などで使用できるデータの圧縮形式、シリアライズ／デシリアライズ、通信のライブラリ。  
ライセンス：Boost Software License, Version 1.0


- [Xbyak](http://homepage1.nifty.com/herumi/soft/xbyak.html)

x86(IA32), x64(AMD64, x86-64)のマシン語命令を実行時に生成するC++のクラスライブラリ。  
ライセンス：修正BSDライセンス


- [MPIR](http://www.mpir.org/)

巨大な数を扱うためのライブラリ。GMPより分岐したものであり，Visaul C++で容易に使えるようになっていることが特徴である。boost::multiprecisionと組み合わせて使用できる。  
ライセンス：LGPL Version 3.0


- [Google Test](https://github.com/google/googletest)

C++コードの自動テストを行うフレームワーク。  
ライセンス：BSD Version 2
