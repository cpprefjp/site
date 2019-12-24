# ラムダ式の初期化キャプチャでのパック展開を許可
* cpp20[meta cpp]

## 概要
[ラムダ式](/lang/cpp11/lambda_expressions.md)の[初期化キャプチャ](../cpp14/initialize_capture.md)で、パック展開ができるようになった。

例えば、関数パラメーターパックをムーブしてキャプチャしようとする際には、次のように書くことができる。

```cpp
template <class... Args>
auto f(Args... args) {
  [...args=std::move(args)] { // 初期化キャプチャでのパック展開

    g(args...); // ラムダ式内で、パックを使う例

  };
}
```

## 仕様

- 省略記号が前に付いた初期化キャプチャは、宣言領域がラムダ式内である初期化キャプチャ(init-capture)パックを導入するパック展開である。
- init-capture パックは、初期化子のパック展開の各要素に init-capture を導入する。

例：

```cpp
template <typename... Args>
void foo(Args... args) {
    [...xs=args]{
        bar(xs...); // xs は init-capture パック
    };
}

foo();  // OK: xs にはゼロ個の初期化キャプチャが含まれています
foo(1); // OK: xs にはひとつの初期化キャプチャが含まれています
```

- パックは、テンプレートパラメータパック、関数パラメータパック、または初期化キャプチャ(init-capture)パックである。 テンプレートパラメータパックまたは関数パラメータパックの要素の数は、パラメータパック識別子に指定された引数の数である。init-capture パックの要素の数は、その初期化子のパック展開の要素の数である。(「パック」の中に init-capture パックが追加された)
- インスタンス化のコンテキストで、init-capture パックの要素は 初期化キャプチャ(init-capture) によって宣言された変数を指定する id-expression であり、パックが宣言されているパターンのインスタンス化の結果である。

注：パターンとは、パック展開の省略記号ではないもので、例えば

```cpp
f(&rest ...);
```

があるとき、`&rest ...` がパック展開で、`&rest` がパターンである。

## 例
```cpp example
#include <utility>

template <class... Args>
auto g([[maybe_unused]] Args... args) {};

template <class... Args>
auto f(Args... args) {
  [...args=std::move(args)] { // 初期化キャプチャでのパック展開

    g(args...); // ラムダ式内で、init-capture パック(args)を使う例

  };
}

int main()
{
    f(1, 3.14, "Hello, World!");
}
```

### 出力
```
```


## この機能が必要になった背景・経緯

パラメーターパックをラムダ式にキャプチャする際、コピーもしくは参照（あるいは `std::tuple`）を用いることでしかキャプチャをすることができなかった。

例えば、上記の例にある関数 `f` は、C++17 以前では次のように書く必要がある。

```cpp
template <class... Args>
auto f(Args... args) {
  [tup=std::make_tuple(std::move(args)...)] {
    std::apply([](auto const&... args) -> decltype(auto) {
      return g(args...);
    }, tup);
  };
}
```

このようなコードは理解し難いため、この機能が提案された。

また、C++17 までの初期化キャプチャの制限は、ラムダ式の初期化キャプチャがクロージャー型の「名前付き」メンバーを導入することによるものだった。

```cpp
template <typename T> void call_f(T t) {
  f(t.x...);
}
```

上のようなコードは診断不要のエラーとなるが、将来クラスメンバをパック展開にすることが許可されると、このコードは有効になる可能性がある。その際、式に展開されていないパックが含まれているかどうかを判断する構文メカニズムが失われてしまうという問題があった。

しかし、この問題は[CWG 1760](http://www.open-std.org/jtc1/sc22/wg21/docs/cwg_defects.html#1760) の採用によって、初期化キャプチャはクロージャ型に名前付きメンバではなく無名メンバを導入するように文言が変更されたため、問題ではなくなっていた。

## 検討されたほかの選択肢
P0780R2 のひとつ前のリビジョンである [P0780R1](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0780r1.html) では、 `...` 記号の位置が、

```cpp
template <class... Args>
auto f(Args... args) {
  [args=std::move(args)...] {
    g(args...);
  };
}
```

のような位置で提案されていた。これが現在のようになったのは、`...` の位置が導入する名前に先行する、既存の慣行と一致するようにするためである。

## 関連項目
- [C++11 ラムダ式](/lang/cpp11/lambda_expressions.md)
- [C++14 ラムダ式の初期化キャプチャ](../cpp14/initialize_capture.md)

## 参照
- [P0780R2 Allow pack expansion in lambda init-capture](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0780r2.html)
- [CWG 1760: Access of member corresponding to init-capture](http://www.open-std.org/jtc1/sc22/wg21/docs/cwg_defects.html#1760)
