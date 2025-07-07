# swap (非メンバ関数)
* any[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  void swap(any& x, any& y) noexcept;
}
```

## 概要
2つの`any`オブジェクトを入れ替える。


## 効果
```cpp
x.swap(y);
```
* swap[link swap.md]


## 例
```cpp example
#include <iostream>
#include <any>

int main()
{
  std::any x = 3;
  std::any y = "Hello";

  std::swap(x, y);

  std::cout << std::any_cast<const char*>(x) << std::endl;
  std::cout << std::any_cast<int>(y) << std::endl;
}
```
* std::swap[color ff0000]

### 出力
```
Hello
3
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 4.0.1 [mark verified]
- [GCC](/implementation.md#gcc): 7.3 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??
