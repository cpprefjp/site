#ビット演算関数オブジェクト
```cpp
namespace std {
  template <typename T>
  struct bit_and {
    T operator ()(const T &x, const T &y) const;
    typedef T first_argument_type, second_argument_type, result_type;
  };

  template <typename T>
  struct bit_or {
    T operator ()(const T &x, const T &y) const;
    typedef T first_argument_type, second_argument_type, result_type;
  };
  template <typename T>
  struct bit_xor {
    T operator ()(const T &x, const T &y) const;
    typedef T first_argument_type, second_argument_type, result_type;
  };
}
```

##概要

ビット演算を提供する関数オブジェクト群。これらは一切のメンバ変数を持たず、状態を保持しない。`bit_not`は用意されていない。

###メンバ関数

| | |
|-------------------------------------|------------------------------|
| `bit_and<T>::operator()` | `x & y` と等価 |
| `bit_or<T>::operator()` | <code>x &#x7C; y</code> と等価 |
| `bit_xor<T>::operator()` | `x ^ y` と等価 |

###メンバ型

| | |
|-----------------------------------|----------------------------|
| `first_argument_type` | `T` と等価  |
| `second_argument_type` | `T` と等価  |
| `result_type` | `T` と等価  |

###例

```cpp
std::cout << "0x" << std::hex << std::bit_and<int>()(0xFA, 0x47) << std::endl;
```

###出力
```cpp
0x42
