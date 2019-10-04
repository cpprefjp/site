# operator++
* atomic[meta header]
* std[meta namespace]
* atomic_ref[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
T operator++() const noexcept;

T operator++(int) const noexcept;
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
この関数は、`atomic_ref`クラスの整数型およびポインタに対する特殊化で定義される。


## 例
### 基本的な使い方
```cpp example
#include <iostream>
#include <atomic>

int main()
{
  int value = 3;
  std::atomic_ref<int> x{value};

  ++x;

  std::cout << value << std::endl;
}
```
* ++x;[color ff0000]


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
  int value = 0;

  // 複数スレッドでインクリメントを呼んでも、
  // 最終的に全てのスレッドでのインクリメントが処理された値になる
  std::thread t1 {[&value] {
    ++std::atomic_ref{value};
  }};
  std::thread t2 {[&value] {
    ++std::atomic_ref{value};
  }};

  t1.join();
  t2.join();

  std::cout << value << std::endl;
}
```

#### 出力
```
2
```


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): (9.0時点で実装なし)
- [GCC](/implementation.md#gcc): 10.1
- [Visual C++](/implementation.md#visual_cpp): ??

