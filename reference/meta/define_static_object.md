# define_static_object
* meta[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std {
  template <class T>
  consteval const remove_cvref_t<T>* define_static_object(T&& t);
}
```

## 概要
コンパイル時に計算したオブジェクトを静的ストレージに配置し、そのポインタを返す。


## 戻り値
`t`のコピーを保持する静的ストレージ上のオブジェクトへのポインタを返す。


## 例
```cpp example
#include <meta>
#include <print>

struct Config {
  int width;
  int height;
};

int main() {
  constexpr auto* p = std::define_static_object(Config{1920, 1080});
  std::println("{}x{}", p->width, p->height);
}
```

### 出力
```
1920x1080
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 16 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`define_static_string`](define_static_string.md)
- [`define_static_array`](define_static_array.md)


## 参照
- [P3491R3 `define_static_{string,object,array}`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3491r3.html)
