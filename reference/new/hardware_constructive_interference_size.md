# hardware_constructive_interference_size
* new[meta header]
* std[meta namespace]
* variable[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  inline constexpr std::size_t hardware_constructive_interference_size = implementation-defined;
}
```

## 概要
2つのオブジェクトに一時局所的にアクセスできる最大サイズ。

この変数と対になる[`hardware_destructive_interference_size`](hardware_destructive_interference_size.md)は、各変数がそれぞれ別なキャッシュラインに乗るようアライメントを調整するものだが、この変数は、複数の変数を意図的に同じキャッシュラインに乗せるためのアライメントサイズである。


## 備考
- この変数の値は、`alignof(`[`max_align_t`](/reference/cstddef/max_align_t.md)`)`以上である
- 実装上、`hardware_constructive_interference_size`と`hardware_destructive_interference_size`は同値になるはずだが、利用目的によって名前を使い分けるために分かれている


## 例
```cpp example
#include <iostream>
#include <new>

struct X {
  int a;
  int b;
};

// Xクラスのメンバ変数aとbが、同じキャッシュラインに乗ることを意図する
static_assert(sizeof(X) <= std::hardware_constructive_interference_size);

int main()
{
  std::cout << "hardware_constructive_interference_size : "
            << std::hardware_constructive_interference_size
            << std::endl;
}
```
* std::hardware_constructive_interference_size[color ff0000]


### 出力例
```
hardware_constructive_interference_size : 64
```


## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 19 [mark verified]
- [GCC](/implementation.md#gcc): 12.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 [mark verified]


## 参照
- [N4523 `constexpr std::thread::hardware_{true,false}_sharing_size`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/n4523.html)
- [P0154R0 `constexpr std::hardware_{constructive,destructive}_interference_size`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0154r0.html)
- [P0154R1 `constexpr std::hardware_{constructive,destructive}_interference_size`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0154r1.html)
- [Understanding `std::hardware_destructive_interference_size` and `std::hardware_constructive_interference_size` - Stack Overflow](https://stackoverflow.com/questions/39680206/understanding-stdhardware-destructive-interference-size-and-stdhardware-cons)
    - 設計についての作者JF Bastien氏からのコメントがある
    - WebAssemblyなどの仮想環境ではターゲットアーキテクチャが実行時に決まるため、実行時の値もあるとよいだろう、とのコメントもある
- [[RFC] C++17 hardware constructive / destructive interference size - Clang Developers Mailing list](https://lists.llvm.org/pipermail/cfe-dev/2018-May/058073.html)
