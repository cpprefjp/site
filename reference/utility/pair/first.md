# first
* utility[meta header]
* std[meta namespace]
* pair[meta class]
* variable[meta id-type]

```cpp
T1 first;
```

## 概要
[`pair`](/reference/utility/pair.md)クラスのメンバ変数で、1つめの要素を表す。

## 例
```cpp example
#include <utility>

int main() {
  std::pair<int, int> p(1, 2);
  std::cout << p.first << std::endl;
}
```
* std::pair[link /reference/utility/pair.md]
* p.first[color ff0000]

### 出力
```
1
```

## 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??