# operator++
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

## 概要
値をインクリメントする


## 戻り値
以下と等価：

- 前置`operator++`：[`fetch_add`](fetch_add.md)`(1) + 1`
- 後置`operator++`：[`fetch_add`](fetch_add.md)`(1)`


## 例外
投げない


## 備考
この関数は、`atomic`クラスの整数型およびポインタに対する特殊化で定義される。


## 例
### 基本的な使い方
```cpp example
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


#### 出力
```
4
```

### 複数スレッドからインクリメントする例
```cpp example
#include <iostream>
#include <atomic>
#include <thread>

int main()
{
  std::atomic<int> x{0};

  // 複数スレッドでインクリメントを呼んでも、
  // 最終的に全てのスレッドでのインクリメントが処理された値になる
  std::thread t1 {[&x] {
    ++x;
  }};
  std::thread t2 {[&x] {
    ++x;
  }};

  t1.join();
  t2.join();

  std::cout << x.load() << std::endl;
}
```
* ++x;[color ff0000]
* x.load()[link load.md]

#### 出力
```
2
```


## バージョン
### 言語
- C++11


### 処理系
- [Clang](/implementation.md#clang): 3.2
- [GCC](/implementation.md#gcc): 4.7.0
- [Visual C++](/implementation.md#visual_cpp): 2012, 2013
