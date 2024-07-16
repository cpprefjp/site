# operator bool
* functional[meta header]
* std[meta namespace]
* move_only_function[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
explicit operator bool() const noexcept;
```

## 概要
関数呼び出しが可能か調べる。


## 戻り値
呼び出す関数を持っていれば`true`、そうでなければ`false`を返す。


## 例
```cpp example
#include <iostream>
#include <functional>

int ident(int x) { return x; }

int main()
{
  std::move_only_function<int(int)> f = ident;

  if (f) {
    std::cout << "not empty" << std::endl;
  }
  else {
    std::cout << "empty" << std::endl;
  }
}
```

### 出力
```
not empty
```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0288R9 move_only_function](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p0288r9.html)
