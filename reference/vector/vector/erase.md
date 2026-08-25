# erase
* vector[meta header]
* std[meta namespace]
* vector[meta class]
* function[meta id-type]

```cpp
iterator erase(iterator position);                 // (1) C++98
iterator erase(const_iterator position);           // (1) C++11
constexpr iterator erase(const_iterator position); // (1) C++20

iterator erase(iterator first, iterator last);  // (2) C++98
iterator erase(const_iterator first,
               const_iterator last);            // (2) C++11
constexpr iterator erase(const_iterator first,
                         const_iterator last);  // (2) C++20
```

## 概要
指定した要素を削除する。


## 要件
- `T`はMoveAssignableでなければならない。


## 効果
- (1) : `position`が指す要素が削除される。
- (2) : `[first, last)`で示されるイテレータ範囲の要素が削除される。

削除された要素またはそれ以降の要素を指すイテレータや参照は無効になる。


## 戻り値
削除された要素の次の要素を指すイテレータを返す。そのような要素が存在しない場合は、[`end()`](end.md)を返す。


## 計算量
削除される要素の数と同じ回数の`T`のデストラクタが実行される。さらに、削除された要素以降の要素の数と同じ回数の`T`の代入演算子が呼ばれる。


## 例外
`T`の代入演算子（ムーブ代入演算子を含む）が例外を投げる場合を除いて、この関数は例外を投げない。この関数はメモリの確保・解放や要素の構築を行わないため、コンストラクタは呼ばれない。


## 例
### 基本的な使い方 (C++11)
```cpp example
#include <iostream>
#include <vector>

void print(const char* name, const std::vector<int>& v)
{
  std::cout << name << " : {";

  bool first = true;
  for (int x : v) {
    if (first) {
      first = false;
    }
    else {
      std::cout << ", ";
    }

    std::cout << x;
  }
  std::cout << "}" << std::endl;
}

int main()
{
  // (1)
  {
    std::vector<int> v = {1, 2, 3, 4, 5};

    // 2番目の単一要素(値3)を削除
    v.erase(v.begin() + 2);
    ::print("(1)", v);
  }

  // (2)
  {
    std::vector<int> v = {1, 2, 3, 4, 5};

    // 範囲[v.begin(), v.begin() + 2)の要素を削除
    v.erase(v.begin(), v.begin() + 2);
    ::print("(2)", v);
  }
}
```
* erase[color ff0000]

#### 出力
```
(1) : {1, 2, 4, 5}
(2) : {3, 4, 5}
```


### イテレート中に要素を削除する (C++11)
```cpp example
#include <iostream>
#include <vector>

int main()
{
  std::vector<int> v = {3, 1, 4};

  // イテレート中に要素削除をするような場合には、
  // 範囲for文は使用できない
  for (auto it = v.begin(); it != v.end();) {
    // 条件一致した要素を削除する
    if (*it == 1) {
      // 削除された要素の次を指すイテレータが返される。
      it = v.erase(it);
    }
    // 要素削除をしない場合に、イテレータを進める
    else {
      ++it;
    }
  }

  for (const auto& x : v) {
    std::cout << x << std::endl;
  }
}
```

#### 出力
```
3
4
```


## 関連項目
- [`erase()` (非メンバ関数)](erase_free.md)
- [`erase_if()` (非メンバ関数)](erase_if_free.md)


## 参照
- [N2350 Container insert/erase and iterator constness (Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2350.pdf)
- [LWG Issue 2853. Possible inconsistency in specification of erase in [vector.modifiers]](https://cplusplus.github.io/LWG/issue2853)
    - C++17で、例外指定からコンストラクタへの言及が削除され、`MoveAssignable`要件と整合するよう整理された
    - この修正は欠陥報告(DR)であり、C++98以降に遡及して適用される。効果の規定により`erase`ではメモリの再確保が起こり得ずコンストラクタは呼ばれないため、元の例外指定は矛盾していただけで処理系の挙動は変わらないため
- [P1004R2 Making `std::vector` constexpr](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1004r2.pdf)
