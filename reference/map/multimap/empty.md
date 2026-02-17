# empty
* map[meta header]
* std[meta namespace]
* multimap[meta class]
* function[meta id-type]

```cpp
bool empty() const;                        // (1) C++03
bool empty() const noexcept;               // (1) C++11
[[nodiscard]] bool empty() const noexcept; // (1) C++20
constexpr bool empty() const noexcept;     // (1) C++26
```

## 概要
コンテナが空かどうかをテストする。 
`multimap` コンテナが空（[`size()`](size.md) が 0）の場合に `true` を返す。 

この関数はコンテナ内のコンテンツを変化させない。コンテンツをクリアするには [`clear()`](clear.md) メンバを使う。


## 戻り値
コンテナサイズが 0 のときに `true`, そうでないときに `false`。


## 計算量
定数時間。


## 例
```cpp example
#include <iostream>
#include <map>

int main ()
{
  std::multimap<int, char> m;

  std::cout << m.empty() << std::endl;

  m.insert(std::make_pair(42,'a'));

  std::cout << m.empty() << std::endl;

  return 0;
}
```
* empty()[color ff0000]
* m.insert[link insert.md]

### 出力
```
1
0
```

## 関連項目

| 名前 | 説明|
|---------------------------------------------------------------------------------------|-----------------------|
| [`multimap::insert`](insert.md) | 要素を挿入する |
| [`multimap::(constructor)`](op_constructor.md) | コンストラクタ |


## 参照
- [P0600R1 `[[nodiscard]]` in the Library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0600r1.pdf)
    - C++20で`[[nodiscard]]`が付加された
- [P2422R1 Remove `nodiscard` annotations from the standard library specification](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2422r1.html)
    - C++26で`[[nodiscard]]`指定が削除された
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
