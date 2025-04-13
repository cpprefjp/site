# スタイル
本サイトで作業を行う上でのスタイルです。

- 「である」調
- 句読点は「、」「。」


型修飾のスタイル：

```cpp
/* (A) */ const T &v
/* (B) */ const T& v
/* (C) */ const T & v
/* (D) */ T const &v
/* (E) */ T const& v
/* (F) */ T const & v
```

本サイトでは、Bのスタイルで型修飾を行います。


## バージョンの表記
### 言語
C++11以降対応については対応バージョンを明記します。バージョン表記が省略されている場合、C++03、C++98対応であることを表します。

#### 例
- C++17
- C++14
- C++11
- C++03
- C++98


### 処理系
開発環境の表記がない場合は、C++98対応のあらゆる環境で使用できるものとします。 
処理系の記載は、作業者が確認できたものを記載します。

#### 例
- Clang: 2.1, 2.8
- GCC: 4.3.4, 4.4.3, 4.4.4, 4.5.2
- IBM XL C/C++ Enterprise Edition, V11.1.0.0
- Intel: 10.1, 11.0, 11.1, 12.0
- PathScale: 3.2
- QCC
- Visual C++: 2003, 2008, 2010
- pgCC: 11.2

表記するバージョンには、「未実装」「実装済み」「動作検証済み」を表す絵文字指定を併記してください。

- GCC: 12.0 [mark noimpl], 13.1 [mark impl], 14.1 [mark verified]

ここで、各指定は以下を意味します。

- mark noimpl : 未実装を表す絵文字
- mark impl : 動作確認はできていないけど、リリースノートやそれに類するドキュメントには実装済みと書かれていることを表す絵文字
- mark verified : 動作検証済み


### 訳語表
訳語表は随時更新していってください。

| 英語               | 日本語 |
|--------------------|----------------------------------------------|
| abstract class                     | 抽象クラス                   |
| aggregate                          | 集成体                       |
| alignment                          | アライメント (表示位置ではなくメモリの文脈) |
| apply, application                 | 適用                         |
| arithmetic type                    | 算術型                       |
| associative container(s)           | 連想コンテナ                 |
| asynchronous operation             | 非同期操作                   |
| base class                         | 基底クラス                   |
| bidirectional iterator             | 双方向イテレータ             |
| bucket                             | バケット                     |
| completion operation               | 完了操作                     |
| completion signature               | 完了シグネチャ               |
| complexity                         | 計算量                       |
| compound type                      | 複合型                       |
| const iterator                     | 読み取り専用イテレータ       |
| const reverse iterator             | 読み取り専用逆イテレータ     |
| covariant                          | 共変的                       |
| data member                        | メンバ変数 (ユーザー視点ではデータメンバより一般的のため) |
| dereference                        | 間接参照                     |
| dereferenceable                    | 間接参照可能                 |
| derived class                      | 派生クラス                   |
| direct base class                  | 直接基底クラス               |
| delegate                           | 委譲                         |
| dynamic extent                     | (std::mdspanの) 動的要素数   |
| effects                            | 効果                         |
| emplace                            | 直接構築                     |
| empty                              | 空                           |
| equal                              | 等値                         |
| equivalence class                  | 同値分類 (数学的文脈)        |
| equivalence relation               | 同値関係 (数学的文脈)        |
| equivalent                         | 同値 (数学的文脈)、等価 (その他文脈) |
| forward iterator                   | 前方向イテレータ             |
| fundamental type                   | 単純型                       |
| ill-formed                         | 不適格                       |
| implementation-defined             | 処理系定義                   |
| indirect base class                | 間接基底クラス               |
| inherited                          | 継承                         |
| input iterator                     | 入力イテレータ               |
| iterator                           | イテレータ                   |
| literal type                       | リテラル型                   |
| load factor                        | 負荷率                       |
| lvalue reference                   | 左辺値参照                   |
| max load factor                    | 最大負荷率                   |
| member                             | メンバ                       |
| move                               | (std::move 的な意味で)ムーブ |
| move assignment                    | ムーブ代入                   |
| move constructor                   | ムーブコンストラクタ         |
| multidimensional index             | 多次元インデクス             |
| multidimensional index space       | 多次元インデクス空間         |
| mutable iterator                   | 可変イテレータ               |
| non-virtual base class             | 非仮想基底クラス             |
| note                               | 注                           |
| output iterator                    | 出力イテレータ               |
| overload                           | オーバーロード               |
| (proposal) paper                   | 提案文書                     |
| partial ordering                   | 半順序                       |
| partition                          | 区分化                       |
| pointer                            | ポインタ                     |
| polymorphic                        | 多相的                       |
| power of N                         | Nの累乗                      |
| predicate                          | 述語                         |
| propagation, propagate             | 伝播<br/> (伝搬は誤用が広まったものなので使わない) |
| pure virtual function              | 純粋仮想関数                 |
| query object                       | 問い合わせオブジェクト       | 
| random access iterator             | ランダムアクセスイテレータ   |
| range                              | 一般用途の場合：範囲<br/> Rangeアルゴリズム・Rangeアダプタ・Rangeオブジェクトの場合：Range<br/> range-based for：範囲for文<br/> 2つのイテレータによる範囲：イテレータ範囲 |
| region of RCU protection           | RCU保護区間                  |
| remarks                            | 備考                         |
| requires                           | 要件                         |
| returns                            | 戻り値                       |
| reverse iterator                   | 逆イテレータ                 |
| rvalue reference                   | 右辺値参照                   |
| sequence container(s)              | シーケンスコンテナ           |
| signed                             | 符号付き                     |
| static extent                      | (std::mdspanの) 静的要素数   |
| stop request                       | 停止要求                     |
| stop state                         | 停止状態                     |
| stop token                         | 停止トークン                 |
| Spurious Failure                   | 見かけ上の失敗<br/> [https://togetter.com/li/430770](https://togetter.com/li/430770) |
| strict weak ordering               | 狭義の弱順序                 |
| stride                             | (std::mdspanの) ストライド幅 |
| strong ordering                    | 全順序                       |
| structural type                    | 構造的型                     |
| synchronization                    | 同期                         |
| total ordering relationalship      | 全順序関係                   |
| trailing return type               | 後置戻り値型                 |
| trait                              | トレイト                     |
| trivial                            | トリビアル (逆は非トリビアル)            |
| underlying type                    | 基底型                       |
| unit-stride slice                  | 単位ストライド幅スライス     |
| unordered associative container(s) | 非順序連想コンテナ           |
| unspecified                        | 未規定                       |
| program-defined type               | プログラム定義型             |
| virtual base class                 | 仮想基底クラス               |
| weak ordering                      | 弱順序                       |
| well-formed                        | 適格                         |
| eligible                           | 資格のある                   |
| synchronizes with                  | に対して同期する ("と同期する" だと対称関係に見えるため) |
| happens before                     | よりも前に発生する                                       |
| strongly happens before            | よりも確実に前に発生する                                 |
| sequenced before                   | よりも前に順序付けられる                                 |
| indeterminately sequenced          | 不定順で順序付けられる                                   |
