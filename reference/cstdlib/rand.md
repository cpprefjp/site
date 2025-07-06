# rand
* cstdlib[meta header]
* std[meta namespace]
* function[meta id-type]

## 概要
`0`から`RAND_MAX`までの値の疑似乱数を返す。

[`std::srand()`](srand.md)関数はこの関数の疑似乱数生成器で使用するシード値を決定する。

もし[`std::srand()`](srand.md)の前に、`std::rand()`が使用された場合、`srand(1)`として生成される。

シード値が同じなら、`std::rand()`も同じ値を返す。

また、標準ライブラリの複数の関数で`std::rand()`関数が呼び出される場合がある。

これは実装に依存している。

この関数がスレッドセーフであるかどうかも実装に依存している。

## 備考
この関数の疑似乱数の品質は保証されていない。

より安全な乱数を使いたい場合は`random`ライブラリなどを使用したほうが良い。

## 例
```cpp example
#include <cstdlib>
#include <ctime>
#include <iostream>

int main() 
{
    std::srand(std::time(0)); // 現在時刻を疑似乱数のシード値とする。
    std::cout << std::rand() << '\n';
}
```

## 出力例
```
1373858591
```

## 関連項目
- [`srand()`](srand.md):この関数の疑似乱数生成器で使用するシード値を決定する。
- [`RAND_MAX`]():この関数で返される疑似乱数の最大値。
- [`random`](/reference/random.md):より安全な乱数生成ライブラリ。
