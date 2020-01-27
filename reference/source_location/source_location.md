# source_location
* source_location[meta header]
* class[meta id-type]
* std[meta namespace]
* cpp20[meta cpp]

```cpp
namespace std {
  struct source_location {
    static consteval source_location current() noexcept;
    constexpr source_location() noexcept;

    constexpr uint_least32_t line() const noexcept;
    constexpr uint_least32_t column() const noexcept;
    constexpr const char* file_name() const noexcept;
    constexpr const char* function_name() const noexcept;

  private:
    uint_least32_t line_;          // exposition only
    uint_least32_t column_;        // exposition only
    const char* file_name_;        // exposition only
    const char* function_name_;    // exposition only
  };
}
```
* uint_least32_t[link /reference/cstdint/uint_least32_t.md]

## 概要
`source_location` は、ソースコード上の位置を表す。

この型は要件Cpp17DefaultConstructible、Cpp17CopyConstructible、 Cpp17CopyAssignable、Cpp17Destructibleを満たす。

## メンバ関数

| 名前                                                  | 説明              | 対応バージョン |
|-------------------------------------------------------|-------------------|----------------|
| [`(constructor)`](source_location/op_constructor.md)  | コンストラクタ    | C++20          |
| [`line`](source_location/line.md)                     | 行番号を返す      | C++20          |
| [`column`](source_location/column.md)                 | 列番号を返す      | C++20          |
| [`file_name`](source_location/file_name.md)           | ファイル名を返す  | C++20          |
| [`function_name`](source_location/function_name.md)   | 関数名を返す      | C++20          |

## 静的メンバ関数

| 名前                                    | 説明                                             | 対応バージョン |
|-----------------------------------------|--------------------------------------------------|----------------|
| [`current`](source_location/current.md) | この関数の呼び出し元のソースコード上の位置を返す | C++20          |


## 例
```cpp example
#include <iostream>
#include <source_location>

int main()
{
  const std::source_location location = std::source_location::current();
  std::cout << location.line() << std::endl;
  std::cout << location.column() << std::endl;
  std::cout << location.file_name() << std::endl;
  std::cout << location.function_name() << std::endl;
}
```

### 出力例
```
??
??
??
??
```

## この機能が必要になった背景・経緯

ソースコード上の位置情報はデバッグにおいて重要である。

C言語から引き継いだ定義済みマク�`__LINE__`、`__FILE__`や[事前定義�別�`__func__`](/lang/cpp11/func.md)で
ソースコード上の位置情報を取得できるが、それらをまとめて取得し、格納しておく方法は標準では提供されていなかったため、
`source_location`が導入された。

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目

- [事前定義�別�`__func__`](/lang/cpp11/func.md)

## 参照

- [P1208R6 Adopt source_location for C++20](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1208r6.pdf)
