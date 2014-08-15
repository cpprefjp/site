#スタイル
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


##バージョンの表記
###言語
C++11以降対応についてはC++11と明記します。バージョン表記が省略されている場合、C++03、C++98対応であることを表します。

####例
- C++11
- C++03
- C++98


###処理系
開発環境の表記がない場合は、C++98対応のあらゆる環境で使用できるものとします。 
「GCC 4.5.0 -std=c++0xオプション」ではなく「GCC, C++0x mode: 4.5.0」とするなど。 
処理系の記載は、作業者が確認できたものを記載します。

####例
- Clang: 2.1, 2.8
- GCC: 3.4.6, 4.2.1, 4.2.4, 4.3.4, 4.3.5, 4.4.0, 4.4.1, 4.4.3, 4.4.4, 4.4.5, 4.5.1, 4.5.2, 4.6.0, 4.6.1
- GCC, C++0x mode: 4.3.4, 4.4.3, 4.4.4, 4.5.2
- IBM XL C/C++ Enterprise Edition, V11.1.0.0
- Intel: 10.1, 11.0, 11.1, 12.0
- PathScale: 3.2
- QCC
- Visual C++ 7.1, 9.0, 10.0
- pgCC: 11.2

それと、訳語表を随時更新していってください。
###訳語表

| 英語               | 日本語 |
|--------------------|----------------------------------------------|
| well-formed                        | 適格                         |
| ill-formed                         | 不適格                       |
| unspecified                        | 未規定                       |
| predicate                          | 述語                         |
| range                              | 範囲                         |
| empty                              | 空                           |
| apply, application                 | 適用                         |
| complexity                         | 計算量                       |
| requires                           | 要件                         |
| returns                            | 戻り値                       |
| effects                            | 効果                         |
| remarks                            | 備考                         |
| note                               | 注                           |
| synchronization                    | 同期                         |
| dereference                        | 間接参照                     |
| dereferenceable                    | 間接参照可能                 |
| mutable iterator                   | 可変イテレータ               |
| polymorphic                        | 多相的                       |
| arithmetic type                    | 算術型                       |
| fundamental type                   | 単純型                       |
| compound type                      | 複合型                       |
| literal type                       | リテラル型                   |
| aggregate                          | 集成体型                     |
| strict weak ordering               | 狭義の弱順序                 |
| move                               | (std::move 的な意味で)ムーブ |
| move constructor                   | ムーブコンストラクタ         |
| move assignment                    | ムーブ代入                   |
| iterator	                         | イテレータ                   |
| const iterator                     | 読み取り専用イテレータ       |
| reverse iterator                   | 逆イテレータ                 |
| const reverse iterator             | 読み取り専用逆イテレータ     |
| emplace                            | 直接構築                     |
| lvalue reference                   | 左辺値参照                   |
| rvalue reference                   | 右辺値参照                   |
| trait                              | トレイト                     |
| sequence container(s)              | シーケンスコンテナ           |
| associative container(s)           | 連想コンテナ                 |
| unordered associative container(s) | 非順序連想コンテナ           |
| total ordering relationalship      | 全順序関係                   |
| equivalence relation               | 等価関係                     |
| implementation-defined             | 処理系定義                   |
| input iterator                     | 入力イテレータ               |
| output iterator                    | 出力イテレータ               |
| forward iterator                   | 前方向イテレータ             |
| bidirectional iterator             | 双方向イテレータ             |
| random access iterator             | ランダムアクセスイテレータ   |
| load factor                        | 負荷率                       |
| Spurious Failure                   | 見かけ上の失敗<br/> [http://togetter.com/li/430770](http://togetter.com/li/430770) |
| max load factor                    | 最大負荷率                   |
| bucket                             | バケット                     |


##処理系のC++11対応状況の調べ方
- 全体的な対応状況： [C++0xCompilerSupport](http://wiki.apache.org/stdcxx/C++0xCompilerSupport)
- GCC： [C++0x/C++11 Support in GCC](http://gcc.gnu.org/projects/cxx0x.html)
- VC++： [C++11 Features in Visual C++ 11](http://blogs.msdn.com/b/vcblog/archive/2011/09/12/10209291.aspx)
- Clang： [C++98 and C++11 Support in Clang](http://clang.llvm.org/cxx_status.html)


