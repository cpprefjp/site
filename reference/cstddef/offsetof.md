# offsetof
* cstddef[meta header]
* macro[meta id-type]

```cpp
# define offsetof(type, member) see-below
```
* see-below[italic]

## 概要
このマクロ関数は、構造体型 `type` のメンバ `member` へのオフセット値をバイト数で返す。

この構造体の先頭から `member` へのバイト数が、`size_t` 型の符号なし整数値で返される。

C++ での構造体の機能的拡張のため、`offsetof` の利用は、C++11以降は[スタンダードレイアウト](/reference/type_traits/is_standard_layout.md)のクラス型に制限され、C++11より以前はC の構造体のコンセプトに対応する POD のクラス型に制限される（但し、`public` な非仮想メンバ関数のみを持ち、コンストラクタ及びデストラクタを持たない非派生クラスも POD である）。

スタンダードレイアウトではないクラス型においての`offsetof`の利用は条件付きのサポートとなる（C++17より以前は未定義動作）。

## パラメータ
- `type` : `member` を有効なメンバ指示子とするクラス型
- `member` : クラス `type` のメンバ指示子


## 戻り値
`type` 中の `member` へのオフセット値を示す `size_t` 型の値


## 例
```cpp example
#include <cstdio>
#include <cstddef>

struct mystruct {
  char singlechar;
  char arraymember[10];
  char anotherchar;
};

int main ()
{
  std::printf("offsetof(mystruct,singlechar) is %zu\n", offsetof(mystruct,singlechar));
  std::printf("offsetof(mystruct,arraymember) is %zu\n", offsetof(mystruct,arraymember));
  std::printf("offsetof(mystruct,anotherchar) is %zu\n", offsetof(mystruct,anotherchar));
}
```
* offsetof[color ff0000]

### 出力
```
offsetof(mystruct,singlechar) is 0
offsetof(mystruct,arraymember) is 1
offsetof(mystruct,anotherchar) is 11
```


