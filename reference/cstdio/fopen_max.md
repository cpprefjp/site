# FOPEN_MAX
* cstdio[meta header]
* macro[meta id-type]

```cpp
#define FOPEN_MAX unspecified
```
* unspecified[italic]

## 概要
実装によって保証されるファイルを同時に開ける最低限の数を表すマクロ。

このマクロは、プログラムが同時にオープンできるファイルの最低限の数を定義する。値は実装依存であり、最低でも8以上であることがC標準によって保証されている。実際の実装では、より大きな値（例：16、256など）が使用されることが多い。

この値は実装の最低保証値であり、実際にはより多くのファイルを同時に開ける場合がある。ただし、システムのリソース制限により、この値より少ない数のファイルしか開けない場合もある。

また、`FOPEN_MAX`は[`TMP_MAX`](/reference/cstdio/tmp_max.md.nolink)と等しいかそれより大きいことが保証される。

## 例
```cpp example
#include <cstdio>
#include <vector>

int main() {
  // FOPEN_MAXの値を表示
  std::printf("FOPEN_MAX = %d\n", FOPEN_MAX);

  // 複数のファイルを開いてみる
  std::vector<std::FILE*> files;

  for (int i = 0; i < FOPEN_MAX; ++i) {
    char filename[32];
    std::sprintf(filename, "temp%d.txt", i);
    std::FILE* file = std::fopen(filename, "w");
    if (file) {
      files.push_back(file);
      std::fprintf(file, "File %d\n", i);
    } else {
      std::printf("Failed to open file %d\n", i);
      break;
    }
  }

  std::printf("Successfully opened %zu files\n", files.size());

  // ファイルを閉じて削除
  for (std::FILE* file : files) {
    std::fclose(file);
  }

  for (int i = 0; i < static_cast<int>(files.size()); ++i) {
    char filename[32];
    std::sprintf(filename, "temp%d.txt", i);
    std::remove(filename);
  }

  return 0;
}
```
* FOPEN_MAX[color ff0000]
* std::printf[link /reference/cstdio/printf.md]
* std::sprintf[link /reference/cstdio/sprintf.md.nolink]
* std::fopen[link /reference/cstdio/fopen.md]
* std::fprintf[link /reference/cstdio/fprintf.md]
* std::fclose[link /reference/cstdio/fclose.md]
* std::remove[link /reference/cstdio/remove.md]

### 出力例
```
FOPEN_MAX = 20
Successfully opened 20 files
```

## 備考
- この値は最低限の保証値であり、実際にはより多くのファイルを開ける場合がある
- システムリソースやOS固有の制限により、この値未満しかファイルを開けない場合もある

## 処理系

- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??