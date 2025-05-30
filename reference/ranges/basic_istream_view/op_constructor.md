# コンストラクタ
* ranges[meta header]
* std::ranges[meta namespace]
* basic_istream_view[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr explicit
  basic_istream_view(basic_istream<CharT, Traits>& stream); // (1) C++20
```

## 概要
[`basic_istream_view`](../basic_istream_view.md)オブジェクトを構築する。

- (1) : [`basic_istream`](/reference/istream/basic_istream.md)の参照を受け取るコンストラクタ


## 効果

- (1) : [`addressof`](/reference/memory/addressof.md)`(stream)`をメンバ変数`stream_`に保持する


## 例
```cpp example
#include <ranges>
#include <sstream>
#include <iostream>

int main() {
  auto iss = std::istringstream{"1 2 3 4 5"};

  for (int i : std::views::istream<int>(iss)) {
    std::cout << i;
  }
}
```

### 出力
```
12345
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]
