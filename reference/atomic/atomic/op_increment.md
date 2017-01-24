#operator++
* atomic[meta header]
* std[meta namespace]
* atomic[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
T operator++() volatile noexcept;
T operator++() noexcept;

T operator++(int) volatile noexcept;
T operator++(int) noexcept;
```

##概要
値をインクリメントする


##戻り値
- 前置`operator++`：[`fetch_add`](fetch_add.md)`(1) + 1`
- 後置`operator++`：[`fetch_add`](fetch_add.md)`(1)`


##例外
投げない


##備考
この関数は、`atomic`クラスの整数型およびポインタに対する特殊化で定義される。


##例
```cpp
#include <iostream>
#include <atomic>

int main()
{
  std::atomic<int> x(3);

  ++x;

  std::cout << x.load() << std::endl;
}
```
* ++x;[color ff0000]
* x.load()[link load.md]


###出力
```
4
```


##バージョン
###言語
- C++11


###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 11.0, 12.0


##参照


