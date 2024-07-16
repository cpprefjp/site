# operator=
* atomic[meta header]
* std[meta namespace]
* atomic_ref[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
T operator=(T desired) const noexcept;
```

## 概要
値を書き込む


## 効果
以下と等価：

```
store(desired);
return desired;
```
* store[link store.md]


## 例外
投げない


## 備考
- 参照先の変更ではなく、参照先の値を書き換えるので注意


## 例
```cpp example
#include <iostream>
#include <atomic>

int main()
{
  int value = 3;
  std::atomic_ref<int> x{value};

  x = 2;

  std::cout << value << std::endl;
}
```
* x = 2;[color ff0000]


### 出力
```
2
```


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0 [mark noimpl]
- [GCC](/implementation.md#gcc): 10.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P1960R0 NB Comment Changes Reviewed by SG1](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1960r0.html)
    - 宣言に`const`を追加
