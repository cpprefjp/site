#resize
* vector[meta header]
* std[meta namespace]
* vector[meta class]
* function[meta id-type]

```cpp
void resize(size_type sz);             // (1) C++11
void resize(size_type sz, const T& c); // (2) C++11
void resize(size_type sz, T c = T());  // (1) + (2) C++03
```

##要件
要素数を変更する


##要件
- (1) :
    - 型`T`がデフォルト構築可能であること (C++14)
    - 型`T`が`*this`に対してコピー挿入可能であること (C++11まで)
    - 型`T`が`*this`に対してムーブ挿入可能であること (C++14)

- (2) :
    - 型`T`が`*this`に対してコピー挿入可能であること (C++14)


##効果
- (1) :
    - もし`sz`が現在のコンテナの[`size()`](size.md)より小さい場合、以下の動作をする：
        - [`erase`](erase.md)`(`[`begin()`](begin.md) `+ sz,` [`end()`](end.md)`);` (C++11まで)
        - [`pop_back()`](pop_back.md)関数を[`size()`](size.md) `- sz`回呼ぶ (C++14以降)
    - もし`sz`が現在のコンテナの[`size()`](size.md)より大きい場合、`sz -` [`size()`](size.md)個だけ値初期化された`T`型オブジェクトのコピーを追加する。


- (2) :
    - C++11まで

    ```cpp
if (sz > size())
  insert(end(), sz - size(), c);
else if (sz < size())
  erase(begin() + sz, end());
```
* size()[link size.md]
* insert[link insert.md]
* end()[link end.md]
* erase[link erase.md]
* begin()[link begin.md]

    - C++14以降
        - もし`sz`が現在のコンテナの[`size()`](size.md)より小さい場合、[`pop_back()`](pop_back.md)関数を[`size()`](size.md) `- sz`回呼ぶ
        - もし`sz`が現在のコンテナの[`size()`](size.md)より大きい場合、`sz -` [`size()`](size.md)個だけオブジェクト`c`のコピーを追加する。


##戻り値
なし


##備考
- (2) : 非コピー挿入可能な型`T`のムーブコンストラクタが例外を送出した場合、この関数は何もしない。


##例
```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main()
{
  // 増加
  {
    std::vector<int> v = {3, 1, 4};
    v.resize(5);

    std::for_each(v.begin(), v.end(), [](int x) { std::cout << x << std::endl; });
  }
  std::cout << std::endl;

  // 減少
  {
    std::vector<int> v = {3, 1, 4};
    v.resize(1);

    std::for_each(v.begin(), v.end(), [](int x) { std::cout << x << std::endl; });
  }
}
```
* resize[color ff0000]

###出力
```
3
1
4
0
0

3
```


##参照
- [LWG Issue 2033. Preconditions of `reserve`, `shrink_to_fit`, and `resize` functions](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2033)
- [LWG Issue 2323. `vector::resize(n, t)`'s specification should be simplified](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2323)

