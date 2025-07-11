# second
* utility[meta header]
* std[meta namespace]
* pair[meta class]
* variable[meta id-type]

```cpp
T2 second;
```

## 概要
[`pair`](/reference/utility/pair.md)クラスのメンバ変数で、2つめの要素を表す。

## 例
```cpp example
#include <utility>

int main() {
  std::pair<int, int> p(1, 2);
  std::cout << p.second << std::endl;
}
```
* std::pair[link /reference/utility/pair.md]
* p.second[color ff0000]

### 出力
```
2
```

## 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??