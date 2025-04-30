# finish
* execution[meta header]
* std::execution[meta namespace]
* run_loop[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
void finish();
```

## 概要
`run_loop`の状態を終了中(finishing)へ変更する。


## 事前条件
説明専用メンバ`state`は[開始(starting)](op_constructor.md)もしくは[実行中(running)](run.md)であること。


## 効果
説明専用メンバ`state`を終了中(finishing)に変更する。


## 同期操作
メンバ関数`finish`および説明専用メンバ関数[`pop-front`, `push-back`](run.md)は不可分(atomically)に実行される。

`finish`は、`nullptr`を返す[`pop-front`操作](run.md)に対して同期する。


## 例
```cpp example
#include <execution>
namespace ex = std::execution;

int main()
{
  ex::run_loop loop;
  loop.finish();
}
```
* finish()[color ff0000]
* ex::run_loop[link ../run_loop.md]

### 出力
```
```

## バージョン
### 言語
- C++26


### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`run`](run.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
- [P3396R1 std::execution wording fixes](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p3396r1.html)
