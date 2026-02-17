# emplace_back
* list[meta header]
* std[meta namespace]
* list[meta class]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
template <class... Args>
void emplace_back(Args&&... args);                // (1) C++11
template <class... Args>
reference emplace_back(Args&&... args);           // (1) C++17
template <class... Args>
constexpr reference emplace_back(Args&&... args); // (1) C++26
```

## 概要
直接構築で新たな要素を末尾に追加する。

この関数の引数 `args...` は、要素型 `value_type` のコンストラクタ引数である。当関数の内部で要素型 `value_type` のコンストラクタを呼び出し、追加する要素を構築する。


## テンプレートパラメータ制約
- `value_type` は、コンテナに対して `args` から直接構築可能であること


## 戻り値
- C++14 まで：なし
- C++17 から：構築した要素への参照


## 計算量
定数時間


## 備考
- この関数の呼び出し後も、全てのイテレータ、および、参照は無効化されない。
- 操作中に例外が発生した場合、副作用は発生しない。


## 例
```cpp example
#include <iostream>
#include <list>
#include <utility>
#include <string>

int main()
{
  std::list<std::pair<int, std::string>> ls;

  ls.push_back(std::make_pair(3, std::string("hello")));
  ls.emplace_back(1, std::string("world"));

  for (const auto& x : ls) {
    std::cout << x.first << ',' << x.second << std::endl;
  };
}
```
* emplace_back[color ff0000]
* ls.push_back[link push_back.md]

### 出力
```
3,hello
1,world
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0 [mark verified]
- [GCC](/implementation.md#gcc): 4.6.4 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目

| 名前                                | 説明                           |
|-------------------------------------|--------------------------------|
| [`emplace_front`](emplace_front.md) | 先頭への直接構築による要素追加 |
| [`push_front`](push_front.md)       | 先頭に要素を追加する           |
| [`push_back`](push_back.md)         | 末尾に要素を追加する           |
| [`emplace`](emplace.md)             | 要素の直接構築による挿入       |
| [`insert`](insert.md)               | 要素の挿入                     |


## 参照
- [N2680 Proposed Wording for Placement Insert (Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2680.pdf)
- [P0084R0 Emplace Return Type](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0084r0.pdf)
- [P0084R1 Emplace Return Type (Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0084r1.pdf)
- [P0084R2 Emplace Return Type (Revision 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0084r2.pdf)
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
