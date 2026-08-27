# operator=
* istream[meta header]
* std[meta namespace]
* basic_istream[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
protected:
  basic_istream& operator=(const basic_istream& rhs) = delete; // (1) C++11

  basic_istream& operator=(basic_istream&& rhs);               // (2) C++11
```
* basic_istream[link ../basic_istream.md]


## 概要
ストリームオブジェクトを代入する。


## 効果
- (1) : コピー代入演算子。コピー代入不可。
- (2) : ムーブ代入演算子。[`swap`](swap.md)`(rhs)`を呼び出す。


## 戻り値
- (2) : `*this`


## 備考
- (1) :
    - C++98 : この演算子は宣言されていなかった。コピー代入を行おうとするとコンパイラがコピー代入演算子を暗黙に生成しようとするが、基底クラスの[`basic_ios`](../../ios/basic_ios.md)`::`[`operator=`](../../ios/basic_ios/op_assign.md)がアクセス指定子`private`で宣言されているため、エラーとなっていた
    - C++11 : アクセス指定子`protected`で`delete`定義される。誤ってコピーしようとした際のエラーメッセージが分かりやすくなる
- (2) : [`rdbuf`](../../ios/basic_ios/rdbuf.md)`()`は交換されない。


## バージョン
### 言語
- C++11


## 関連項目
- [`basic_istream`](../basic_istream.md)`::`[`basic_istream`](op_constructor.md)
- [`basic_istream`](../basic_istream.md)`::`[`swap`](swap.md)
- [`basic_ios`](../../ios/basic_ios.md)`::`[`operator=`](../../ios/basic_ios/op_assign.md)
- [`basic_ios`](../../ios/basic_ios.md)`::`[`swap`](../../ios/basic_ios/swap.md)


## 参照
- [LWG Issue 911. I/O streams and move/swap semantic](https://cplusplus.github.io/LWG/issue911)
    - C++11で、ムーブコンストラクタ・ムーブ代入演算子・`swap`が`protected`となり、非メンバ関数の`swap`が削除された。派生クラスのみが使用でき、基底クラスのオブジェクトを直接ムーブ・交換できないようにするため
