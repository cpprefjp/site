# ロックフリープロパティ
* atomic[meta header]
* macro[meta id-type]
* cpp11[meta cpp]

```cpp
# define ATOMIC_BOOL_LOCK_FREE unspecified
# define ATOMIC_CHAR_LOCK_FREE unspecified
# define ATOMIC_CHAR16_T_LOCK_FREE unspecified
# define ATOMIC_CHAR32_T_LOCK_FREE unspecified
# define ATOMIC_WCHAR_T_LOCK_FREE unspecified
# define ATOMIC_SHORT_LOCK_FREE unspecified
# define ATOMIC_INT_LOCK_FREE unspecified
# define ATOMIC_LONG_LOCK_FREE unspecified
# define ATOMIC_LLONG_LOCK_FREE unspecified
# define ATOMIC_POINTER_LOCK_FREE unspecified
```
* unspecified[italic]

## 概要
これらのマクロは、それぞれの型`T`が[`atomic<T>`](atomic.md)でロックフリーに振る舞うかを調べるために使用できる。値は未規定。
これらのマクロはそれぞれ以下の型を意味する。符号ありなしはまとめて扱われる。

| マクロ | 型 |
|-------------------------------------------------|------------------------|
|` ATOMIC_BOOL_LOCK_FREE` |` bool` |
|` ATOMIC_CHAR_LOCK_FREE` |` char` |
|` ATOMIC_CHAR16_T_LOCK_FREE` |` char16_t` |
|` ATOMIC_CHAR32_T_LOCK_FREE` |` char32_t` |
|` ATOMIC_WCHAR_T_LOCK_FREE` |` wchar_t` |
|` ATOMIC_SHORT_LOCK_FREE` |` short` |
|` ATOMIC_INT_LOCK_FREE` |` int` |
|` ATOMIC_LONG_LOCK_FREE` |` long` |
|` ATOMIC_LLONG_LOCK_FREE` |` long long` |
|` ATOMIC_POINTER_LOCK_FREE` |` T*` |


これらのマクロが置き換えられる値は以下のようになる：

| 値 | 説明 |
|---|--------------------------------------------------------------------|
| 0 | その型はロックフリーに振る舞うことはできない |
| 1 | その型はロックフリーに振る舞うことがある |
| 2 | その型は常にロックフリーに振る舞う |


## 例
```cpp
#include <iostream>
#include <atomic>

int main()
{
  std::cout << "bool      : " << ATOMIC_BOOL_LOCK_FREE << std::endl;
  std::cout << "char      : " << ATOMIC_CHAR_LOCK_FREE << std::endl;
  std::cout << "char16_t  : " << ATOMIC_CHAR16_T_LOCK_FREE << std::endl;
  std::cout << "char32_t  : " << ATOMIC_CHAR32_T_LOCK_FREE << std::endl;
  std::cout << "wchar_t   : " << ATOMIC_WCHAR_T_LOCK_FREE << std::endl;
  std::cout << "short     : " << ATOMIC_SHORT_LOCK_FREE << std::endl;
  std::cout << "int       : " << ATOMIC_INT_LOCK_FREE << std::endl;
  std::cout << "long      : " << ATOMIC_LONG_LOCK_FREE << std::endl;
  std::cout << "long long : " << ATOMIC_LLONG_LOCK_FREE << std::endl;
  std::cout << "T*        : " << ATOMIC_POINTER_LOCK_FREE << std::endl;
}
```

### 出力例
```
bool      : 2
char      : 2
char16_t  : 2
char32_t  : 2
wchar_t   : 2
short     : 2
int       : 2
long      : 2
long long : 2
T*        : 2
```


## バージョン
### 言語
- C++11

### 処理系

- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 11.0, 12.0, 14.0, 14.1


## 参照


