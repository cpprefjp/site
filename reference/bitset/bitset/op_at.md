# operator[]
* bitset[meta header]
* std[meta namespace]
* bitset[meta class]
* function[meta id-type]

```cpp
bool operator[](size_t pos) const;           // (1) C++03
constexpr bool operator[](size_t pos);       // (1) C++11
constexpr bool operator[](size_t pos) const; // (1) C++14

reference operator[](size_t pos);            // (2)
```
* reference[link reference.md]

## 概要
任意の位置のビットにアクセスする。


## 要件
`pos <` [`size()`](size.md)であること。


## 戻り値
- (1) : `pos`番目のビットが1になっていれば`true`、そうでなければ`false`を返す。
- (2) : `pos`番目のビットを表すプ��シオブジェクトを返す。この戻り値を`bool`への変換として扱った場合は、`bs.`[`test`](test.md)`(pos)`と同じ効果となる。戻り値をビットの書き換え(`bs[pos] = value`)として扱った場合は、`bs.`[`set`](set.md)`(pos, value)`と同じ効果となる。


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

