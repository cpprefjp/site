# not-a-scheduler
* [meta exposition-only]
* execution[meta header]
* class[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
struct not-a-scheduler {
  using scheduler_concept = scheduler_t;

  constexpr auto schedule() const noexcept {
    return not-a-sender();
  }
};
```
* scheduler_t[link scheduler.md]
* not-a-sender[link not-a-sender.md]

## 概要
`not-a-scheduler`は、Senderアルゴリズム動作仕様定義で用いられる説明専用のクラスである。


## バージョン
### 言語
- C++26


## 関連項目
- [`execution::on`](on.md)


## 参照
- [P3557R3 High-Quality Sender Diagnostics with Constexpr Exceptions](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3557r3.html)
