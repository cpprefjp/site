# スタイル
本サイトで作業を行う上でのスタイルです。

- 「である」調
- 句読点は「、」「。」


型修飾のスタイル：

- A) const T &v
- B) const T& v
- C) const T & v
- D) T const &v
- E) T const& v
- F) T const & v

本サイトでは、Bのスタイルで型修飾を行います。


## バージョンの表記
### 言語
C++11以降対応についてはC++11と明記します。バージョン表記が省略されている場合、C++03、C++98対応であることを表します。

#### 例
- C++11
- C++03
- C++98


### 処理系
開発環境の表記がない場合は、C++98対応のあらゆる環境で使用できるものとします。 
「GCC 4.5.0 -std=c++0xオプション」ではなく「GCC, C++11 mode: 4.5.0」とするなど。 
処理系の記載は、作業者が確認できたものを記載します。

#### 例
- Clang: 2.1, 2.8
- GCC: 3.4.6, 4.2.1, 4.2.4, 4.3.4, 4.3.5, 4.4.0, 4.4.1, 4.4.3, 4.4.4, 4.4.5, 4.5.1, 4.5.2, 4.6.0, 4.6.1
- GCC, C++11 mode: 4.3.4, 4.4.3, 4.4.4, 4.5.2
- IBM XL C/C++ Enterprise Edition, V11.1.0.0
- Intel: 10.1, 11.0, 11.1, 12.0
- PathScale: 3.2
- QCC
- Visual C++: 2003, 2008, 2010
- pgCC: 11.2

それと、訳語表を随時更新していってください。
### 訳語表

| 英語               | 日本語 |
|--------------------|----------------------------------------------|
| aggregate                          | 集成体型                     |
| alignment                          | アライメント (表示位置ではなくメモリの文脈) |
| apply, application                 | 適用                         |
| arithmetic type                    | 算術型                       |
| associative container(s)           | 連想コンテナ                 |
| bidirectional iterator             | 双方向イテレータ             |
| bucket                             | バケット                     |
| complexity                         | 計算量                       |
| compound type                      | 複合型                       |
| const iterator                     | 読み取り専用イテレータ       |
| const reverse iterator             | 読み取り専用逆イテレータ     |
| dereference                        | 間接参照                     |
| dereferenceable                    | 間接参照可能                 |
| effects                            | 効果                         |
| emplace                            | 直接構築                     |
| empty                              | 空                           |
| equivalence relation               | 等価関係                     |
| forward iterator                   | 前方向イテレータ             |
| fundamental type                   | 単純型                       |
| ill-formed                         | 不適格                       |
| implementation-defined             | 処理系定義                   |
| input iterator                     | 入力イテレータ               |
| iterator                           | イテレータ                   |
| literal type                       | リテラル型                   |
| load factor                        | 負荷率                       |
| lvalue reference                   | 左辺値参照                   |
| max load factor                    | 最大負荷率                   |
| move                               | (std::move 的な意味で)ムーブ |
| move assignment                    | ムーブ代入                   |
| move constructor                   | ムーブコンストラクタ         |
| mutable iterator                   | 可変イテレータ               |
| note                               | 注                           |
| output iterator                    | 出力イテレータ               |
| overload                           | オーバーロード               |
| partition                          | 区分化                       |
| polymorphic                        | 多相的                       |
| predicate                          | 述語                         |
| random access iterator             | ランダムアクセスイテレータ   |
| range                              | 範囲                         |
| remarks                            | 備考                         |
| requires                           | 要件                         |
| returns                            | 戻り値                       |
| reverse iterator                   | 逆イテレータ                 |
| rvalue reference                   | 右辺値参照                   |
| sequence container(s)              | シーケンスコンテナ           |
| Spurious Failure                   | 見かけ上の失敗<br/> [https://togetter.com/li/430770](https://togetter.com/li/430770) |
| strict weak ordering               | 狭義の弱順序                 |
| synchronization                    | 同期                         |
| total ordering relationalship      | 全順序関係                   |
| trailing return type               | 後置戻り値型                 |
| trait                              | トレイト                     |
| unordered associative container(s) | 非順序連想コンテナ           |
| unspecified                        | 未規定                       |
| well-formed                        | 適格                         |



## 処理系のC++11対応状況の調べ方
- 全体的な対応状況： [C++0xCompilerSupport](https://wiki.apache.org/stdcxx/C++0xCompilerSupport)
- GCC： [C++0x/C++11 Support in GCC](https://gcc.gnu.org/projects/cxx-status.html#cxx11)
- VC++： [C++11/14/17 の機能のサポート (Modern C++)](https://msdn.microsoft.com/ja-jp/library/hh567368.aspx)
- Clang： [C++98 and C++11 Support in Clang](http://clang.llvm.org/cxx_status.html)


