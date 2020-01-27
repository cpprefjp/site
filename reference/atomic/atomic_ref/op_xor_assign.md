# operator^=
* atomic[meta header]
* std[meta namespace]
* atomic_ref[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
T operator^=(T operand) const noexcept;
```

## 概要
XOR演算を行う


## 戻り値
以下と�価の式により、演算結果の値が返る：

```cpp
return fetch_xor(operand) ^ operand;
```
* fetch_xor[link fetch_xor.md]


## 例外
投げない


## 備考
この関数は、`atomic_ref`クラスの整数型に対する特殊化で定義される。


## 例
### 基本的な使い方
```cpp example
#include <iostream>
#include <atomic>
#include <bitset>

int main()
{
  int value = 0b1011;
  std::atomic_ref<int> x{value};

  x ^= 0b1110;

  std::cout << std::bitset<4>(value).to_string() << std::endl;
}
```
* to_string()[link /reference/bitset/bitset/to_string.md]

#### 出力
```
0101
```

### 複数スレッドからビット複合演算を行う例
```cpp example
#include <iostream>
#include <atomic>
#include <thread>

int main()
{
  int ar[] = {1, 2, 3, 4, 5};
  int hash{ar[0]};

  // XORで配列のハッシュ値を並列に計算する。
  // 複数スレッドでビット複合演算を呼んでも、
  // 最終的に全てのスレッドでのビット複合演算が処理された値になる
  std::thread t1 {[&hash, ar] {
    std::atomic_ref{hash} ^= ar[1];
    std::atomic_ref{hash} ^= ar[2];
  }};
  std::thread t2 {[&hash, ar] {
    std::atomic_ref{hash} ^= ar[3];
    std::atomic_ref{hash} ^= ar[4];
  }};

  t1.join();
  t2.join();

  std::cout << std::hex << hash << std::endl;
}
```

#### 出力
```
1
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): (9.0時点で実装なし)
- [GCC](/implementation.md#gcc): 10.1
- [Visual C++](/implementation.md#visual_cpp): ??

