# operator=
* future[meta header]
* std[meta namespace]
* packaged_task[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
packaged_task& operator=(packaged_task&) = delete;       // (1) C++11
packaged_task& operator=(const packaged_task&) = delete; // (1) C++14

packaged_task& operator=(packaged_task&& rhs) noexcept;  // (2)
```

## 概要
- (1) : コピー代入演算�。コピー不可。
- (2) : ムーブ代入演算�。


## 効果
- (2) : `*this`の共有状態を解放し、`packaged_task(`[`std::move`](/reference/utility/move.md)`(rhs)).swap(*this)`を行う。


## 戻り値
- (2) : `*this`


## 例外
- (2) : 投げない


## 例
```cpp example
#include <future>
#include <utility>

int foo() { return 3; }

int main()
{
  // ムーブ代入
  // 共有状態の所有権とタスクを移動する
  std::packaged_task<int()> task1(foo);
  std::packaged_task<int()> task2;

  task2 = std::move(task1);

  // task1は共有状態を持たない
}
```
* std::move[link /reference/utility/move.md]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012


## 参照
- [LWG Issue 2067. `packaged_task` should have deleted copy c'tor with const parameter](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2067)


