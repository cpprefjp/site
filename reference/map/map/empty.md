# empty
* map[meta header]
* std[meta namespace]
* map[meta class]
* function[meta id-type]

```cpp
bool empty() const;                        // C++03
bool empty() const noexcept;               // C++11
[[nodiscard]] bool empty() const noexcept; // C++20
```

## 概要
コンテナが空かどうかをテストする。 
`map` コンテナが空（[`size()`](size.md) が 0）の場合に `true` を返す。 

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
  std::map<int, char> m;

  std::cout << m.empty() << std::endl;

  m.insert(std::make_pair(42, 'a'));

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
| [`map::insert`](insert.md) | 要素を挿入する |
| [`map::(constructor)`](op_constructor.md) | コンストラクタ |


## 参照
- [P0600R1 `[[nodiscard]]` in the Library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0600r1.pdf)
