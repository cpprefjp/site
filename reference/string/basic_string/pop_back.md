# pop_back
* string[meta header]
* std[meta namespace]
* basic_string[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
void pop_back();
```

## 概要
末尾の1要素を削除する。


## 要件
`!`[`empty`](empty.md)`()`


## 効果
[`erase`](erase.md)`(`[`size()`](size.md) `- 1, 1)`


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <string>

int main()
{
  std::string s = "helloo";

  // 末尾の`o`を1つ削除する
  s.pop_back();

  std::cout << s << std::endl;
}
```
* pop_back()[color ff0000]

### 出力
```
hello
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang, C++11 mode](/implementation.md#clang): 3.0
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.3
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): ?


## 参照
- [LWG Issue 534. Missing `basic_string` members](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#534)

