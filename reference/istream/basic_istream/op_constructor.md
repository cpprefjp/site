# コンストラクタ
* istream[meta header]
* std[meta namespace]
* basic_istream[meta class]
* function[meta id-type]

```cpp
public:
  explicit basic_istream(basic_streambuf<CharT, Traits>* sb); // (1) C++98

protected:
  basic_istream(const basic_istream& rhs) = delete;           // (2) C++11

  basic_istream(basic_istream&& rhs);                         // (3) C++11
```
* basic_istream[link ../basic_istream.md]
* basic_streambuf[link ../../streambuf/basic_streambuf.md]


## 概要
入力ストリームオブジェクトを構築する。

- (1) : ストリームバッファを受け取って構築する
- (2) : コピーコンストラクタ。コピー構築不可
- (3) : ムーブコンストラクタ


## 効果
- (1) : [`basic_ios`](../../ios/basic_ios.md)`<char_type, traits_type>::`[`init`](../../ios/basic_ios/init.md)`(sb)`を呼び出して初期化する。あわせて、[`gcount()`](gcount.md)が`0`を返すようにする。
- (3) : 基底クラスを[`basic_ios`](../../ios/basic_ios.md)`<char_type, traits_type>::`[`move`](../../ios/basic_ios/move.md)`(rhs)`によってムーブ構築し、`rhs`の[`gcount()`](gcount.md)の値をコピーする。その後、`rhs`の[`gcount()`](gcount.md)を`0`にする。


## 備考
- (2) :
    - C++98 : このコンストラクタは宣言されていなかった。コピー構築を行おうとするとコンパイラがコピーコンストラクタを暗黙に生成しようとするが、基底クラスの[`basic_ios`](../../ios/basic_ios.md)のコピーコンストラクタがアクセス指定子`private`で宣言されているため、エラーとなっていた
    - C++11 : アクセス指定子`protected`で`delete`定義される。誤ってコピーしようとした際のエラーメッセージが分かりやすくなる


## バージョン
### 言語
- C++98


## 関連項目
- [`basic_istream`](../basic_istream.md)`::`[`~basic_istream`](op_destructor.md)
- [`basic_istream`](../basic_istream.md)`::`[`operator=`](op_assign.md)
- [`basic_istream`](../basic_istream.md)`::`[`swap`](swap.md)
- [`basic_ios`](../../ios/basic_ios.md)`::`[`init`](../../ios/basic_ios/init.md)
- [`basic_ios`](../../ios/basic_ios.md)`::`[`move`](../../ios/basic_ios/move.md)


## 参照
- [LWG Issue 911. I/O streams and move/swap semantic](https://cplusplus.github.io/LWG/issue911)
    - C++11で、ムーブコンストラクタ・ムーブ代入演算子・`swap`が`protected`となり、非メンバ関数の`swap`が削除された。派生クラスのみが使用でき、基底クラスのオブジェクトを直接ムーブ・交換できないようにするため
