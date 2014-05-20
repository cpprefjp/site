#hash (C++11)
```cpp
namespace std {
  template <class T> struct hash;

  // ハッシュ関数の特殊化
  template <> struct hash<bool>;
  template <> struct hash<char>;
  template <> struct hash<signed char>;
  template <> struct hash<unsigned char>;
  template <> struct hash<char16_t>;
  template <> struct hash<char32_t>;
  template <> struct hash<wchar_t>;
  template <> struct hash<short>;
  template <> struct hash<unsigned short>;
  template <> struct hash<int>;
  template <> struct hash<unsigned int>;
  template <> struct hash<long>;
  template <> struct hash<long long>;
  template <> struct hash<unsigned long>;
  template <> struct hash<unsigned long long>;
  template <> struct hash<float>;
  template <> struct hash<double>;
  template <> struct hash<long double>;
  template<class T> struct hash<T*>;
}
```

##概要

クラステンプレート`hash`は、非順序連想コンテナ（[`unordered_map`](/reference/unordered_map/unordered_map.md)/[`unordered_multimap`](/reference/unordered_map/unordered_multimap.md)/[`unordered_set`](/reference/unordered_set/unordered_set.md)/[`unordered_multiset`](/reference/unordered_set/unordered_multiset.md)）のキーとなる型のためのハッシュ値を計算する関数オブジェクトである。
このクラスはそのものにデフォルトの定義は存在せず、ユーザーが任意の型で特殊化する際の要件を定義する。`hash`クラステンプレートを特殊化する場合、以下の機能を持たせる必要がある：

###メンバ関数

| 名前 | 説明 |
|-----------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------|
| `hash()`<br/>`hash(const hash&)`<br/>`hash(hash&&)` | デフォルトコンストラクタ、コピーコンストラクタ、ムーブコンストラクタを持つ |
| `~hash()` | デストラクタを持つ |
| `hash& operator=(const hash&)`<br/>`hash& operator=(hash&&)` | コピー代入演算子とムーブ代入演算子を持つ |
| `size_t operator()(T key)` | 関数呼び出し演算子によって、キーに対応するハッシュ値を返す |

###メンバ型

| 名前 | 説明 |
|-----------------|------------------------------------------------------|
| `result_type`   | 戻り値の型([`size_t`](/reference/cstddef/size_t.md)) |
| `argument_type` | 引数の型(キーの型`T`) |

###例
```cpp
#include <iostream>
#include <functional>
 
int main()
{
  int x;
 
  // char型の値'C'に対するハッシュ値を求める
  std::cout << std::hash<char>()('C') << std::endl;
  // int型の値100に対するハッシュ値を求める
  std::cout << std::hash<int>()(100) << std::endl;
  // double型の値3.14に対するハッシュ値を求める
  std::cout << std::hash<double>()(3.14) << std::endl;
  // int*型のアドレス値(&x)に対するハッシュ値を求める
  std::cout << std::hash<int*>()(&x) << std::endl;
}
```

###出力例
```
67
100
1427109137
3219530756
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??

###参照

