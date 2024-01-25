# thisポインタをもつ必要のない演算子をstaticとして宣言できるようにする
* cpp23[meta cpp]

## 概要
以下の演算子が`this`ポインタを必要としない (状態をもたない) 場合、演算子オーバーロードを`static`として定義できる：

- `operator()` (関数呼び出し演算子)
- `operator[]` (添字演算子)

またラムダ式においても同様に、`static`をつけられるようになる。`static`をつけた場合、以下のようになる：

- `mutable`を同時に指定することはできない
- `const`メンバ関数ではなくなる

これらを`static`として定義することで、演算子の呼び出しが高速化することを期待できる。


## 例
```cpp example
#include <iostream>

struct F {
  static bool operator()(int x) {
    return x > 0;
  }
};

int main()
{
    std::cout << F::operator()(1) << std::endl;
    std::cout << F{}(1) << std::endl;

    auto f1 = []() static { return 1; };
    std::cout << f1() << std::endl;
}
```

### 出力
```
1
1
1
```


## この機能が必要になった背景・経緯
関数オブジェクトは関数ポインタに比べてインライン化しやすいため、パフォーマンスで有利である。しかし、関数オブジェクトがなんらかの理由でインライン化されない場合に、`this`ポインタを渡すための余分なレジスタを使わなければならない。

状態をもたない関数オブジェクトでは`this`ポインタの受け渡しは必要なく、無駄である。必要ないもののためにコストを支払わないという基本的な思想に反していたため、`this`ポインタの受け渡しをなくせる機能として、`static`指定の許可を導入した。


## 関連項目
- [C++11 ラムダ式](/lang/cpp11/lambda_expressions.md)
- [`std::function::`推論補助](/reference/functional/function/op_deduction_guide.md)


## 参照
- [P1169R4 `static operator()`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p1169r4.html)
- [P2589R0 `static operator[]`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2589r0.pdf)
