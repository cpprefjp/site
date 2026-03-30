# unchecked_emplace_back
* inplace_vector[meta header]
* std[meta namespace]
* inplace_vector[meta class]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
template <class... Args>
constexpr reference unchecked_emplace_back(Args&&... args); // (1) C++26
```

## 概要
容量チェックなしで末尾へ直接構築する。


## 事前条件
[`size()`](size.md) `< N`であること。この条件を満たさない場合、動作は未定義。


## 効果
[`std::forward`](/reference/utility/forward.md)`<Args>(args)...`から構築した要素を末尾に追加する。


## 戻り値
追加された要素への参照


## 計算量
定数時間


## 備考
この関数は容量チェックを行わないため、[`emplace_back()`](emplace_back.md)よりも高速に動作しうる。呼び出し前に容量に空きがあることが確実な場合に使用する。


## 例
```cpp example
#include <print>
#include <inplace_vector>
#include <string>

int main()
{
  std::inplace_vector<std::string, 3> iv;

  iv.unchecked_emplace_back("hello");
  iv.unchecked_emplace_back(3, 'a');

  for (const auto& s : iv) {
    std::println("{}", s);
  }
}
```
* unchecked_emplace_back[color ff0000]

### 出力
```
hello
aaa
```

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 23 [mark verified]
- [GCC](/implementation.md#gcc): 16 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]

## 参照
- [P0843R14 `inplace_vector`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p0843r14.html)
