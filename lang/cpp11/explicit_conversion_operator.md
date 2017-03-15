# 明示的な型変換演算子のオーバーロード
* cpp11[meta cpp]

## 概要
型変換演算子のオーバーロードをする際、`operator`キーワードの前に`explicit`を付加することで、その型変換演算子は明示的な型変換が行われる文脈でのみ呼び出されるようになる：

```cpp
template <class T>
class SmartPointer {
  T* p_ = nullptr;
public:
  // boolへの明示的な型変換演算子
  explicit operator bool() const
  {
    return p_;
  }
};

int main()
{
  SmartPointer<int> p;

  // OK : if文による条件式のboolへの型変換
  if (p) {}
  else {}

//p + 1; // コンパイルエラー : 暗黙の型変換演算子ではコンパイルが通っていた
}
```
* explicit operator bool[color ff0000]
* nullptr[link nullptr.md]

明示的な型変換演算子を使用することにより、従来の危険な型変換を抑制できる。上記サンプルコードでの、`bool`への型変換演算子を持つ`p`に対して、`p + 1`のような式が許可されていたものが、明示的な型変換演算子ではコンパイルエラーとなる。


## 仕様
```cpp
struct X {
  constexpr explicit operator bool() const
  {
    return true;
  }
};

int main()
{
  constexpr X x {};

//bool b1 = x;                    // コンパイルエラー : boolへの暗黙変換
                                  // bool型パラメータを持つ関数への引数渡し、
                                  // bool型戻り値を持つ関数からの戻り値も同様

  bool b2 = (bool)x;              // OK : キャストによる明示的な型変換
  bool b3 = static_cast<bool>(x); // OK : キャストによる明示的な型変換
  bool b4 = bool(x);              // OK : 関数スタイルのキャスト
//bool b5 = x == true;            // コンパイルエラー : bool値との比較は暗黙の型変換
  bool b6 = !x;                   // OK : 否定演算子によるboolへの変換後の反転
  bool b7 = !!x;                  // OK : 否定演算子を2回適用することでboolに型変換
  bool b8 = x && true;            // OK : 論理積演算子によるboolへの型変換

  if (x) {} // OK : if文による条件式のboolへの変換

  bool b9 = x ? true : false;     // OK : 条件演算子によるboolへの型変換

  static_assert(x, "x must be bool");  // OK : 条件式のboolへの型変換
}
```
* constexpr[link constexpr.md]
* static_assert[link static_assert.md]


## 参照
- [N1592 Explicit Conversion Operators](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2004/n1592.pdf)
- [N2223 Explicit Conversion Operator Draft Working Paper](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2223.pdf)
- [N2333 Explicit Conversion Operator Draft Working Paper Revision 1](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2333.html)

