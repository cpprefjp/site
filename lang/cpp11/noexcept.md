#noexcept
* cpp11[meta cpp]

##概要
C++11で導入された`noexcept`キーワードには、以下の2つの意味がある：

ひとつは、`throw`キーワードによる例外指定の代替。関数がどの例外を送出する可能性があるかを列挙するのではなく、例外を送出する可能性があるかないかのみを指定する。例外を送出する可能性がある関数には`noexcept(false)`を指定し、例外を送出する可能性がある関数には`noexcept(true)`もしくは`noexcept`を指定する：

```cpp
class Integer {
  int value_ = 0;

public:
  // getValue()メンバ関数は、例外を送出しない
  int getValue() const noexcept
  {
    return value_;
  }
};
```

`noexcept`キーワードのもうひとつの意味は、式が例外を送出する可能性があるかどうかを判定する演算子である。`noexcept(f(arg))`のように`noexcept`演算子に式を指定することで、その式が例外を送出する可能性があるかどうかを、コンパイル時定数の`bool`値として取得できる。つまり、関数に対して指定された`noexcept`の情報を取得する：

```cpp
Integer x;
static_assert(noexcept(x.getValue()), "getValue() function never throw exception");
```
* static_assert[link static_assert.md]

`noexcept`は、代表的には以下の2つの用途で使用できる：

1. パフォーマンス向上
    - 例外を送出しないという保証があることで、コンパイラは例外送出によるスタック巻き戻しのためのスタックを確保する必要がなくなる
2. 例外を決して送出しない強い例外安全性の保証(No-throw guarantee)
    - 例外安全性で有名な問題として`stack`の`pop`操作がある。要素型`T`のコピーコンストラクタが例外を送出する可能性があるために`pop`の関数は`T`を返すのではなく戻り値型`void`とする必要があった。しかし`return`文に指定する式が決して例外を送出しないという保証があることで、`pop`の関数は`T`型のオブジェクトを返せるようになる。
	- 参照： [ジェネリックコンポーネントにおける例外安全性 - boostjp](http://boostjp.github.io/archive/boost_docs/document/generic_exception_safety.html)


##仕様
(執筆中)


##例
(執筆中)
```cpp
```

###出力
```
```

##この機能が必要になった背景・経緯
(執筆中)


##参照
- [N3050 Allowing Move Constructors to Throw (Rev. 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2010/n3050.html)
- [N3166 Destructors default to `noexcept`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2010/n3166.html)
- [N3167 Delete operators default to `noexcept`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2010/n3167.html)
- [N3204 Deducing "`noexcept`" for destructors](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2010/n3204.htm)
- [N3205 Delete operators default to `noexcept`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2010/n3205.htm)
- [N3103 Security impact of `noexcept`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2010/n3103.pdf)

