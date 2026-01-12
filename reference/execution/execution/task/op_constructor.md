# コンストラクタ
* execution[meta header]
* std::execution[meta namespace]
* task[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
task(task&& other) noexcept;
```

## 概要
ムーブコンストラクタ


## 効果
説明専用メンバ変数`handle`を[`exchange`](/reference/utility/exchange.md)`(other.handle, {})`で初期化する。


## 備考
`task`オブジェクトは、タスクコルーチンの呼び出しによってのみ構築される。ムーブのみ可能なため、コピーコンストラクタは提供されない。


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P3552R3 Add a Coroutine Task Type](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3552r3.html)
