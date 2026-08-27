# コンストラクタ
* istream[meta header]
* std[meta namespace]
* basic_iostream[meta class]
* function[meta id-type]

```cpp
public:
  explicit basic_iostream(basic_streambuf<CharT, Traits>* sb); // (1) C++98

protected:
  basic_iostream(const basic_iostream& rhs) = delete;          // (2) C++11

  basic_iostream(basic_iostream&& rhs);                        // (3) C++11
```
* basic_iostream[link ../basic_iostream.md]
* basic_streambuf[link ../../streambuf/basic_streambuf.md]


## 概要
入出力ストリームオブジェクトを構築する。

- (1) : ストリームバッファを受け取って構築する
- (2) : コピーコンストラクタ。コピー構築不可
- (3) : ムーブコンストラクタ


## 効果
- (1) : 基底クラスのコンストラクタ呼び出しとして、[`basic_istream`](../basic_istream.md)`<CharT, Traits>(sb)`と[`basic_ostream`](../../ostream/basic_ostream.md)`<CharT, Traits>(sb)`を実行する。
- (3) : 基底クラスの[`basic_istream`](../basic_istream.md)`<CharT, Traits>`を`rhs`からムーブ構築する。


## 備考
- (2) :
    - C++98 : このコンストラクタは宣言されていなかった。コピー構築を行おうとするとコンパイラがコピーコンストラクタを暗黙に生成しようとするが、基底クラスの[`basic_ios`](../../ios/basic_ios.md)のコピーコンストラクタがアクセス指定子`private`で宣言されているため、エラーとなっていた
    - C++11 : アクセス指定子`protected`で`delete`定義される。誤ってコピーしようとした際のエラーメッセージが分かりやすくなる


## バージョン
### 言語
- C++98


## 関連項目
- [`basic_iostream`](../basic_iostream.md)`::`[`~basic_iostream`](op_destructor.md)
- [`basic_iostream`](../basic_iostream.md)`::`[`operator=`](op_assign.md)
- [`basic_iostream`](../basic_iostream.md)`::`[`swap`](swap.md)
- [`basic_istream`](../basic_istream.md)`::`[`basic_istream`](../basic_istream/op_constructor.md)
- [`basic_ostream`](../../ostream/basic_ostream.md)`::`[`basic_ostream`](../../ostream/basic_ostream/op_constructor.md)


## 参照
- [LWG Issue 911. I/O streams and move/swap semantic](https://cplusplus.github.io/LWG/issue911)
    - C++11で、ムーブコンストラクタ・ムーブ代入演算子・`swap`が`protected`となり、非メンバ関数の`swap`が削除された。派生クラスのみが使用でき、基底クラスのオブジェクトを直接ムーブ・交換できないようにするため
