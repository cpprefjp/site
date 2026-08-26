# operator[]
* bitset[meta header]
* std[meta namespace]
* bitset[meta class]
* function[meta id-type]

```cpp
bool operator[](size_t pos) const;           // (1) C++98
constexpr bool operator[](size_t pos) const; // (1) C++11

reference operator[](size_t pos);            // (2) C++98
constexpr reference operator[](size_t pos);  // (2) C++23
```
* reference[link reference.md]

## 概要
任意の位置のビットにアクセスする。


## 堅牢化された事前条件
`pos <` [`size()`](size.md)であること。


## 戻り値
- (1) : `pos`番目のビットが1になっていれば`true`、そうでなければ`false`を返す。
- (2) : `pos`番目のビットを表すプロキシオブジェクトを返す。この戻り値を`bool`への変換として扱った場合は、`bs.`[`test`](test.md)`(pos)`と同じ効果となる。戻り値をビットの書き換え(`bs[pos] = value`)として扱った場合は、`bs.`[`set`](set.md)`(pos, value)`と同じ効果となる。


## 例外
投げない。


## 例
```cpp example
#include <iostream>
#include <bitset>

int main()
{
  std::bitset<4> bs("1010");

  // 0番目のビットが1か0かを調べる
  bool zero = bs[0];
  std::cout << std::boolalpha << zero << std::endl;

  // 0番目のビットを1にする
  bs[0] = true;
  std::cout << bs << std::endl;
}
```

### 出力
```
false
1011
```


## 参照
- [N3669 Fixing constexpr member functions without const](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3669.pdf)
- [P2417R2 A more constexpr bitset](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2417r2.pdf)
- [P3471R4 Standard library hardening](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3471r4.html)
- [P3878R1 Standard library hardening should not use the 'observe' semantic](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3878r1.html)
- [LWG Issue 907. Bitset's immutable element retrieval is inconsistently defined](https://cplusplus.github.io/LWG/issue907)
    - C++11で、`const`版の戻り値の規定が[`test(pos)`](test.md)という自己参照から「`pos`番目のビットが1なら`true`」という直接の記述へ改められた。`test()`は例外を送出しうるため、`constexpr`であるこの演算子を`test()`で定義することはできなかった
