# notify_all
* atomic[meta header]
* std[meta namespace]
* atomic_ref[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
void notify_all() const noexcept; // (1) C++20
constexpr void notify_all() const noexcept; // (1) C++26
```

## 概要
待機している全てのスレッドを起床させる。

この関数は、[`wait()`](wait.md)関数によるブロッキング待機を解除する。


## テンプレートパラメータ制約
- C++26 : [`is_const_v`](/reference/type_traits/is_const.md)`<T>`が`false`であること


## 効果
起床待機している全てのアトミックオブジェクトの待機を解除する


## 戻り値
なし


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <atomic>
#include <thread>

int main()
{
  bool x = false;

  auto f = [&x] {
    std::atomic_ref r{x};
    while (true) {
      r.wait(false);
      if (r.load() == true) {
        break;
      }
    }
  };

  std::thread t1 {f};
  std::thread t2 {f};

  std::atomic_ref{x}.store(true);
  std::atomic_ref{x}.notify_all();

  t1.join();
  t2.join();
}
```
* notify_all()[color ff0000]
* load[link load.md]
* store[link store.md]
* wait[link wait.md]

### 出力
```
```


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0 [mark noimpl]
- [GCC](/implementation.md#gcc): 9.2 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]


## 参照
- [P0514R4 Efficient concurrent waiting for C++20](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0514r4.pdf)
- [ogiroux/atomic_wait - Sample implementation of C++20 atomic_wait/notify](https://github.com/ogiroux/atomic_wait)
- [P1643R1 Add wait/notify to `atomic_ref`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1643r1.html)
- [P1960R0 NB Comment Changes Reviewed by SG1](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1960r0.html)
    - 宣言に`const`を追加
- [P3323R1 cv-qualified types in `atomic` and `atomic_ref`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p3323r1.html)
    - C++26でCV修飾されたテンプレート引数を受け取れるようになった
- [P3309R3 `constexpr atomic` and `atomic_ref`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p3309r3.html)
    - C++26で`constexpr`に対応した
