# get_allocator
* unordered_map[meta header]
* std[meta namespace]
* unordered_map[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
allocator_type get_allocator() const noexcept;
```

## 概要
このコンテナで使用されているアロケータオブジェクトを取得する。


## 戻り値
このコンテナで使用されているアロケータオブジェクト


## 例外
投げない


## 例
```cpp
#include <unordered_map>

int main()
{
  std::unordered_map<char, int> um;

  std::allocator<std::pair<const char, int>> result = um.get_allocator();
}
```
* get_allocator[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang, C++11 mode](/implementation.md#clang): 3.0
- [GCC, C++11 mode](/implementation.md#gcc): 4.3.6
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 10.0, 11.0, 12.0, 14.0, 14.1
	- 10.0は、`noexcept`が修飾されていない。
	- 11.0, 12.0は、`noexcept`が実装されていないため、`throw()`が修飾されている。


