# [[nodiscard]]属性に理由となる文字列を付加できるようにする [P1301R4]
* cpp20[meta cpp]

## 概要
戻り値が使用されない場合に警告を出力させる[`[[nodiscard]]`属性](/lang/cpp17/nodiscard.md)に、戻り値を無視してはならない理由を文字列リテラルとして指定できるようにする。

これにより、以下のようなことをユーザーに警告メッセージとして伝えることができる：

- 戻り値を無視するとリソースリークの可能性がある
- 誤って別な関数を使ってしまっている可能性がある

理由を設定できることで、ユーザーが関数の実装を調べなくても戻り値を無視してはならない理由を正確に知ることができるようになる。


## 仕様
- `nodiscard`属性は、以下の形式の引数をとることができる：
    - `nodiscard(文字列リテラル)`
- `nodiscard`属性なしで宣言された名前もしくはエンティティは、あとで属性をつけて再宣言でき、その逆もできる。その際、引数のありなしも変更できる
- `nodiscard`属性の引数である文字列リテラルは、戻り値を無視してはならない理由、意図を示すことや、適切な使用方法の可能性を提案するためなどに、警告メッセージとして使用されることを目的とする


## 例
```cpp example
#include <memory>
#include <vector>

class data_holder {
  std::unique_ptr<char[]> ptr;
  std::vector<int> indices;

public:
  // この関数のユーザーに所有権を委譲する。
  // ユーザーはこの戻り値のメモリを適切に解放しなければならず、
  // 戻り値を無視するとメモリリークが発生してしまう
  [[nodiscard("Possible memory leak.")]] 
  char* release() {
    indices.clear();
    return ptr.release();
  }

  void clear() {
    indices.clear();
    ptr.reset(nullptr);
  }

  // clear()関数のつもりでempty()関数を呼び出してしまった可能性がある。
  // empty()は空かどうかを判定するだけで、空にするわけではない
  [[nodiscard("Did you mean 'clear'?")]] 
  bool empty() const {
    return ptr != nullptr && !indices.empty();
  }
};

int main() {
  data_holder dh; // 本来はなんらかの初期化処理を行う

  // 重大な間違いを、警告で説明する
  dh.release();

  // 軽微な間違いを、警告で説明する
  dh.empty();
}
```
* indices.clear()[link /reference/vector/vector/clear.md]
* indices.empty()[link /reference/vector/vector/empty.md]
* ptr.release()[link /reference/memory/unique_ptr/release.md]
* ptr.reset[link /reference/memory/unique_ptr/reset.md]

### 出力例
```
prog.cc: In function 'int main()':
prog.cc:35:19: warning: ignoring return value of 'char* data_holder::release()', declared with attribute 'nodiscard': 'Possible memory leak.' [-Wunused-result]
   35 |         dh.release();
      |         ~~~~~~~~~~^~
prog.cc:13:9: note: declared here
   13 |   char* release() {
      |         ^~~~~~~
prog.cc:37:17: warning: ignoring return value of 'bool data_holder::empty() const', declared with attribute 'nodiscard': 'Did you mean 'clear'?' [-Wunused-result]
   37 |         dh.empty();
      |         ~~~~~~~~^~
prog.cc:26:8: note: declared here
   26 |   bool empty() const {
      |        ^~~~~
```


## 関連項目
- [C++17 `[[nodiscard]]`属性](/lang/cpp17/nodiscard.md)
- [C++20 `[[nodiscard]]`をコンストラクタのオーバーロードごとに付加できるようにする](nodiscard_for_constructors.md)


## 参照
- [P1301R4 `[[nodiscard("should have a reason")]]`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1301r4.html)
