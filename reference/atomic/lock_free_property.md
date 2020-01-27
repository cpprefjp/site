# �ックフリープ�パティ
* atomic[meta header]
* macro[meta id-type]
* cpp11[meta cpp]

```cpp
# define ATOMIC_BOOL_LOCK_FREE unspecified      // (1)
# define ATOMIC_CHAR_LOCK_FREE unspecified      // (2)
# define ATOMIC_CHAR8_T_LOCK_FREE unspecified   // (3) C++20から
# define ATOMIC_CHAR16_T_LOCK_FREE unspecified  // (4)
# define ATOMIC_CHAR32_T_LOCK_FREE unspecified  // (5)
# define ATOMIC_WCHAR_T_LOCK_FREE unspecified   // (6)
# define ATOMIC_SHORT_LOCK_FREE unspecified     // (7)
# define ATOMIC_INT_LOCK_FREE unspecified       // (8)
# define ATOMIC_LONG_LOCK_FREE unspecified      // (9)
# define ATOMIC_LLONG_LOCK_FREE unspecified     // (10)
# define ATOMIC_POINTER_LOCK_FREE unspecified   // (11)
```
* unspecified[italic]

## 概要
これらのマク�は、それぞれの型`T`が[`atomic<T>`](atomic.md)で�ックフリーに振る舞うかを調べるために使用できる。値は未規定。
これらのマク�はそれぞれ以下の型を意味する。符号ありなしはまとめて扱われる。

| マク� | 型 |
|-------------------------------------------------|------------------------|
|` ATOMIC_BOOL_LOCK_FREE` |` bool` |
|` ATOMIC_CHAR_LOCK_FREE` |` char` |
|` ATOMIC_CHAR8_T_LOCK_FREE`  |` char8_t`  |
|` ATOMIC_CHAR16_T_LOCK_FREE` |` char16_t` |
|` ATOMIC_CHAR32_T_LOCK_FREE` |` char32_t` |
|` ATOMIC_WCHAR_T_LOCK_FREE` |` wchar_t` |
|` ATOMIC_SHORT_LOCK_FREE` |` short` |
|` ATOMIC_INT_LOCK_FREE` |` int` |
|` ATOMIC_LONG_LOCK_FREE` |` long` |
|` ATOMIC_LLONG_LOCK_FREE` |` long long` |
|` ATOMIC_POINTER_LOCK_FREE` |` T*` |


これらのマク�が置き換えられる値は以下のようになる：

| 値 | 説明 |
|---|--------------------------------------------------------------------|
| 0 | その型は�ックフリーに振る舞うことはできない |
| 1 | その型は�ックフリーに振る舞うことがある |
| 2 | その型は常に�ックフリーに振る舞う |


## 例
```cpp example
#include <iostream>
#include <atomic>

int main()
{
  std::cout << "bool      : " << ATOMIC_BOOL_LOCK_FREE << std::endl;
  std::cout << "char      : " << ATOMIC_CHAR_LOCK_FREE << std::endl;
  std::cout << "char8_t   : " << ATOMIC_CHAR8_T_LOCK_FREE << std::endl;
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
char8_t   : 2
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
- [GCC](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012, 2013, 2015, 2017


## 関連項目
- [`std::atomic`](atomic.md)クラスの`is_always_lock_free`メンバ定数
- [C++20 `char8_t`](/lang/cpp20/char8_t.md)
